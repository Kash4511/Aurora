import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Chat
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            # Get other user id from URL
            other_user_id = int(self.scope["url_route"]["kwargs"]["user_id"])
            self.user = self.scope["user"]

            # Create a consistent room name (sorted by user ids)
            self.room_group_name = f"chat_{min(self.user.id, other_user_id)}_{max(self.user.id, other_user_id)}"

            # Join group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

            # Fetch previous chat messages
            messages = await sync_to_async(list)(
                Chat.objects.filter(
                    sender_id__in=[self.user.id, other_user_id],
                    receiver_id__in=[self.user.id, other_user_id]
                ).order_by("date").values("id", "sender__username", "message", "date")
            )

            history = [
                {
                    "id": m["id"],
                    "sender": m["sender__username"],
                    "message": m["message"],
                    "date": m["date"].isoformat()
                }
                for m in messages
            ]

            # Send chat history to the user
            await self.send(text_data=json.dumps({"type": "history", "messages": history}))

            print(f"🔌 [CONNECT] user={self.user.username} room={self.room_group_name}")

        except Exception as e:
            print("❌ [ERROR in connect]:", e)
            import traceback
            traceback.print_exc()
            await self.close()

    async def disconnect(self, close_code):
        # Leave group
        if hasattr(self, "room_group_name"):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"🔌 [DISCONNECT] room={getattr(self, 'room_group_name', 'unknown')} code={close_code}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data.get("message", "").strip()
            if not message:
                return

            # Save message to DB
            receiver_id = int(self.scope["url_route"]["kwargs"]["user_id"])
            chat_instance = await sync_to_async(Chat.objects.create)(
                sender=self.user,
                receiver_id=receiver_id,
                message=message
            )

            # Broadcast message to group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "id": chat_instance.id,
                    "sender": self.user.username,
                    "message": message,
                    "date": chat_instance.date.isoformat(),
                }
            )
        except Exception as e:
            print("❌ [ERROR in receive]:", e)
            import traceback
            traceback.print_exc()

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))
