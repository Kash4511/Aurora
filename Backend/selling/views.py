from rest_framework import generics
from .models import Product
from .serializers import Productserializer

class SellFormView(generics.CreateAPIView):
    serializer_class = Productserializer
    queryset = Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
