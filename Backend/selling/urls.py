from django.urls import path
from .views import SellFormView

urlpatterns = [
    path('', SellFormView.as_view(), name='sell_form'),
]
