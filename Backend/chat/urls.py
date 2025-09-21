from django.urls import path
from .views import ChatListAPIView, UserSearchView

urlpatterns = [
    path('chat/<int:user_id>/', ChatListAPIView.as_view(), name='chat-detail'),
    path("users/", UserSearchView.as_view(), name="user-search"),
] 