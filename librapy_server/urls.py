from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

book_router = routers.DefaultRouter()
book_router.register('book', views.BookViewSet, basename='book')

urlpatterns = [
    # path('', views.index, name='index'),
    path('api/', include(book_router.urls)),
]