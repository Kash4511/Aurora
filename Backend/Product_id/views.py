from rest_framework import generics
from selling.models import Product
from selling.serializers import Productserializer


class ProductDetails(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = Productserializer
    lookup_field = 'id'
