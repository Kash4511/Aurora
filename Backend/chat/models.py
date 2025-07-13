from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats_as_sender")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats_as_receiver")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date'] 