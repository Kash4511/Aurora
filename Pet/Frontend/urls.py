from django.urls import path
from .views import index

urlpatterns = [

    path('', index, name='index'),  # URL pattern for the index view
]
