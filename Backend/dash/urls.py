from django.urls import path
from .views import dashsales

urlpatterns = [
    path('', dashsales.as_view(), name='sell_form'),
]
