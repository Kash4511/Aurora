from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from rest_framework.permissions import IsAuthenticated
from .serializers import Productserializer
import logging

logger = logging.getLogger(__name__)

class SellFormView(generics.CreateAPIView):
    serializer_class = Productserializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            product = serializer.save(user=self.request.user)
            logger.info(f"Product created successfully: {product.id}")
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            raise

class ProductListView(generics.ListAPIView):
    serializer_class = Productserializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            products = Product.objects.filter(user=self.request.user)
            logger.info(f"Found {products.count()} products for user {self.request.user.id}")
            return products
        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            return Product.objects.none() 