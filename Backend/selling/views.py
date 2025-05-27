from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from rest_framework.permissions import IsAuthenticated
from .serializers import Productserializer


class SellFormView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = Productserializer
    queryset = Product.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)         