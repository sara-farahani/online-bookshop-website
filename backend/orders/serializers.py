from rest_framework import serializers
from .models import Order
from store.models import Book 

from rest_framework import serializers
from .models import Book, Cart, CartItem, Order


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = BookSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'created', 'items']
        read_only_fields = ['id', 'created', 'items']


class OrderSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True)
    book_ids = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), many=True, write_only=True, source='books'
    )

    class Meta:
        model = Order
        fields = ['id', 'user', 'books', 'book_ids', 'total_price', 'created_at', 'is_paid', 'status']
        read_only_fields = ['user', 'total_price', 'created_at']

