from rest_framework import generics
from .models import Book
from .serializers import BookSerializer


class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveAPIView):
    print("\n\n\n\nFETCHHHH BOOOKK IN BOOKDETAILVIEW")
    queryset = Book.objects.all()
    serializer_class = BookSerializer
