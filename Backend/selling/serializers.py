from rest_framework import serializers
from .models import Product

class Productserializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['item_name', 'item_price', 'item_description', 'country', 'state', 'city']
        extra_kwargs = {
            'item_name': {'required': True},
            'item_price': {'required': True},
            'item_description': {'required': True},
            'country': {'required': True},
            'state': {'required': False},
            'city': {'required': True},
        }
