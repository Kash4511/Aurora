from django.urls import path
from .views import ProductDetails

urlpatterns = [
    path('', ProductDetails.as_view(), name='product-detail'),
]
