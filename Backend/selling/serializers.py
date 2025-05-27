from rest_framework import serializers
from .models import Product
import logging

logger = logging.getLogger(__name__)

class Productserializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True},
            'item_name': {'required': True},
            'item_price': {'required': True},
            'item_description': {'required': True},
            'country': {'required': True},
            'state': {'required': False},
            'city': {'required': True},
            'image': {'required': True},
        }

    def get_image(self, obj):
        try:
            image_url = obj.get_image_url()
            logger.info(f"Generated image URL: {image_url}")
            return image_url
        except Exception as e:
            logger.error(f"Error getting image URL: {str(e)}")
            return None
