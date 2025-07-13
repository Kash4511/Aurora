from django.contrib import admin
from .models import Chat

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'receiver', 'message', 'is_read', 'date')
    search_fields = ('sender__username', 'receiver__username', 'message')
    list_filter = ('is_read', 'date') 