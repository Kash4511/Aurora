from django.contrib import admin

from .models import Room  # make sure Notes model is imported

@admin.register(Room)
class Rooms(admin.ModelAdmin):
    list_display = ('host', 'code', 'created_at')
    search_fields = ('host', 'code')
    