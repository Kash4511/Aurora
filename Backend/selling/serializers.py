from rest_framework import serializers
from .models import Product
from django.conf import settings

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
        if obj.image:
            # If it's already a full URL, return it
            if str(obj.image).startswith('http'):
                return str(obj.image)
            # Otherwise, construct the Cloudinary URL
            return f"https://res.cloudinary.com/{settings.CLOUDINARY_STORAGE['CLOUD_NAME']}/image/upload/{obj.image}"
        return None
