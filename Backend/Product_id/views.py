from rest_framework import generics, permissions
from selling.models import Product
from selling.serializers import Productserializer
from rest_framework.permissions import IsAuthenticated

class ProductDetails(generics.RetrieveUpdateDestroyAPIView):  # <-- this is key
    queryset = Product.objects.all()
    serializer_class = Productserializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'