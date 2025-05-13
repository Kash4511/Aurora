from rest_framework import serializers
from .models import Product

class Productserializer(serializers.ModelSerializer):
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
            'image' : {'required': True},
        }
