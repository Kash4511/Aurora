from django.shortcuts import render
from selling.models import Product
from selling.serializers import Productserializer
from rest_framework import generics, permissions
# Create your views here.

from rest_framework.permissions import IsAuthenticated


class ProductListView(generics.ListAPIView):
    serializer_class = Productserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(user=self.request.user)
