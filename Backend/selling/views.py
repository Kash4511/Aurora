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
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        try:
            # Log the incoming request data
            logger.info(f"Creating product with data: {serializer.validated_data}")
            
            # Check if image is present
            if 'image' in serializer.validated_data:
                logger.info(f"Image file received: {serializer.validated_data['image'].name}")
            else:
                logger.warning("No image file provided in request")
            
            product = serializer.save(user=self.request.user)
            logger.info(f"Product created successfully: {product.id}")
            
            # Log the final image URL
            if product.image:
                logger.info(f"Product image URL: {product.get_image_url()}")
            else:
                logger.warning(f"No image URL available for product {product.id}")
                
        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            raise

class ProductListView(generics.ListAPIView):
    serializer_class = Productserializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        try:
            products = Product.objects.filter(user=self.request.user)
            logger.info(f"Found {products.count()} products for user {self.request.user.id}")
            
            # Log image URLs for debugging
            for product in products:
                if product.image:
                    logger.info(f"Product {product.id} image URL: {product.get_image_url()}")
                else:
                    logger.warning(f"Product {product.id} has no image")
                    
            return products
        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            return Product.objects.none() 