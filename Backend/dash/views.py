from rest_framework import generics
from selling.models import Product  # Use absolute import
from selling.serializers import Productserializer  # Use absolute import

class dashsales(generics.ListAPIView):
    serializer_class = Productserializer
    queryset = Product.objects.all()