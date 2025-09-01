from django.test import TestCase
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from django.urls import re_path
from .consumers import ChatConsumer
from django.contrib.auth.models import User
import json

class ChatConsumerTest(TestCase):
    async def test_websocket_connection(self):
        # Create test users
        user1 = await self.create_user('user1', 'user1@test.com')
        user2 = await self.create_user('user2', 'user2@test.com')
        
        # Test WebSocket connection
        application = URLRouter([
            re_path(r'ws/chat/(?P<user_id>\d+)/$', ChatConsumer.as_asgi()),
        ])
        
        communicator = WebsocketCommunicator(
            application,
            f"/ws/chat/{user2.id}/"
        )
        communicator.scope['user'] = user1
        
        connected, _ = await communicator.connect()
        self.assertTrue(connected)
        
        await communicator.disconnect()
    
    @staticmethod
    async def create_user(username, email):
        return User.objects.create_user(username=username, email=email, password='testpass123') 