from django.contrib import admin
from .models import Product
from django.contrib.auth.models import User

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('user','item_name', 'item_price', 'item_description', 'country', 'state', 'city')
    search_fields = ('item_name', 'country', 'state', 'city')


