from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView, OrderCreateView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart-detail'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:pk>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('order/create/', OrderCreateView.as_view(), name='create-order'),
]

