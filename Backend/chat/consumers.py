from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
import traceback

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            self.user = self.scope["user"]
            other_user_id = int(self.scope["url_route"]["kwargs"]["user_id"])

            # ✅ Deterministic room name: min_id_max_id
            room_id = f"{min(self.user.id, other_user_id)}_{max(self.user.id, other_user_id)}"
            self.room_group_name = f"chat_{room_id}"

            print(f"🔌 [CONNECT] user={self.user.username} room={self.room_group_name} channel={self.channel_name}")

            # Add channel to the group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
            await self.send(text_data=json.dumps({"message": "✅ Connected!"}))

            # Optional: send chat history
            await self.send_chat_history(self.user.id, other_user_id)

        except Exception as e:
            print("❌ [ERROR in connect]:", str(e))
            traceback.print_exc()
            await self.close()

    async def disconnect(self, close_code):
        try:
            print(f"🔌 [DISCONNECT] room={getattr(self, 'room_group_name', '?')} code={close_code}")
            if hasattr(self, 'room_group_name') and self.room_group_name:
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
        except Exception as e:
            print("❌ [ERROR in disconnect]:", str(e))
            traceback.print_exc()

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data.get("message", "").strip()
            if not message:
                return

            from django.contrib.auth.models import User
            from .models import Chat

            # Parse other user from URL
            other_user_id = int(self.scope["url_route"]["kwargs"]["user_id"])
            receiver = await database_sync_to_async(User.objects.get)(id=other_user_id)

            # Save chat message
            await database_sync_to_async(Chat.objects.create)(
                sender=self.user,
                receiver=receiver,
                message=message
            )

            # Broadcast message to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message,
                    "sender": self.user.username,
                    "receiver": receiver.username,
                }
            )

        except Exception as e:
            print("❌ [ERROR in receive]:", str(e))
            traceback.print_exc()
            await self.send(text_data=json.dumps({"error": str(e)}))

    async def chat_message(self, event):
        try:
            await self.send(text_data=json.dumps({
                "message": event["message"],
                "sender": event["sender"],
                "receiver": event["receiver"],
            }))
        except Exception as e:
            print("❌ [ERROR in chat_message]:", str(e))
            traceback.print_exc()

    # Optional: send previous chat history
    async def send_chat_history(self, user_id, other_user_id, limit=50):
        from .models import Chat
        from django.contrib.auth.models import User

        try:
            history = await database_sync_to_async(list)(
                Chat.objects.filter(
                    sender_id__in=[user_id, other_user_id],
                    receiver_id__in=[user_id, other_user_id]
                )
                .order_by("-date")[:limit]
                .values("id", "sender__username", "receiver__username", "message", "date")
            )

            # Send history to the connecting user
            for msg in reversed(history):
                await self.send(text_data=json.dumps(msg))

        except Exception as e:
            print("❌ [ERROR in send_chat_history]:", str(e))
            traceback.print_exc()
