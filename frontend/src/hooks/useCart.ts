import { useEffect, useState } from "react";

const LOCAL_KEY = "cart_data";

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setCartItems(JSON.parse(stored).items || []);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ items: cartItems }));
  }, [cartItems]);

  const addItem = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          product,
          quantity,
        },
      ];
    });
  };

  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addItem,
    removeItem,
    clearCart,
  };
}
