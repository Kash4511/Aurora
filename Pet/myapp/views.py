from django.shortcuts import render
from .serializers import RoomSerializer
from .models import Room
from rest_framework import generics

# Create your views here.
class Roomview (generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

