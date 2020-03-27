from django.shortcuts import render
from librapy_server.models import Book
from librapy_server.serializers import BookSerializer
from rest_framework import viewsets


class BookViewSet(viewsets.ModelViewSet):
  queryset = Book.objects.all()
  serializer_class = BookSerializer 

def index(request):
    return render(request, 'librapy_base.html')