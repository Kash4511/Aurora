from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Chat
from .serializers import ChatSerializer, UserSerializer
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView
from rest_framework import generics
from django.contrib.auth import get_user_model
from .models import Chat
from .serializers import ChatSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter


User = get_user_model()

class ChatListAPIView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        other_user_id = self.kwargs['user_id']
        return Chat.objects.filter(
            Q(sender=user, receiver_id=other_user_id) |
            Q(sender_id=other_user_id, receiver=user)
        )

    def perform_create(self, serializer):
        # Automatically set sender and receiver
        sender = self.request.user
        receiver_id = self.kwargs['user_id']
        serializer.save(sender=sender, receiver_id=receiver_id)

class UserSearchView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email']