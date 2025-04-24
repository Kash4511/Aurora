from django.contrib import admin
from django.urls import path
from . import views
from .views import Roomview

urlpatterns = [
    path('', Roomview.as_view() , name='Room'),
   
]