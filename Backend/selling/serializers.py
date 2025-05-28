from rest_framework import serializers
from .models import Product
import logging

logger = logging.getLogger(__name__)

class Productserializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'user', 'item_name', 'item_price', 'item_description', 
                 'country', 'state', 'city', 'phone_number', 'social_ID', 
                 'image', 'image_url']
        extra_kwargs = {
            'user': {'read_only': True},
            'item_name': {'required': True},
            'item_price': {'required': True},
            'item_description': {'required': True},
            'country': {'required': True},
            'state': {'required': False},
            'city': {'required': True},
        }

    def get_image_url(self, obj):
        try:
            url = obj.get_image_url()
            if url:
                logger.info(f"Generated image URL for product {obj.id}: {url}")
                return url
            logger.warning(f"No image URL generated for product {obj.id}")
            return None
        except Exception as e:
            logger.error(f"Error getting image URL for product {obj.id}: {str(e)}")
            return None
