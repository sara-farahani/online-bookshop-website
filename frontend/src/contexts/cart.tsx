import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import fetchCartProducts from "../lib/api/cart";
import { useAuth } from "./login";
import { axiosJsonwithAuth } from "../lib/api/axios";
import type { CartItem, CartContextType } from "../assets/types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedin } = useAuth();
  useEffect(() => {
    async function loadCart() {
      try {
        if (isLoggedin) {
          const response = await fetchCartProducts();
          setCartItems(response.data);
        } else {
          const storedItems = localStorage.getItem("guest_cart");
          setCartItems(storedItems ? JSON.parse(storedItems) : []);
        }
      } catch (error) {
        console.error("خطا در دریافت سبد خرید:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCart();
  }, [isLoggedin]);

  useEffect(() => {
    const syncGuestCart = async () => {
      const stored = localStorage.getItem("guest_cart");
      if (stored && isLoggedin) {
        const postItemurl = `http://localhost:8000/api/orders/cart/add/`;
        const guestCartItems = JSON.parse(stored);
        for (const item of guestCartItems) {
          const body = {
            product_id: item.id,
            quantity: item.quantity,
          };
          console.log("bodyyyyy", body);
          const config = { method: "POST" };
          const postResponse = await axiosJsonwithAuth(
            postItemurl,
            body,
            config
          );
        }
        localStorage.removeItem("guest_cart");
      }
    };
    syncGuestCart();
  }, [isLoggedin]);

  async function addItem(item: any, quantity: number = 1) {
    if (isLoggedin) {
      const postItemurl = `http://localhost:8000/api/orders/cart/add/`;
      const body = { product_id: item.id, quantity: quantity };
      const config = { method: "POST" };
      const postResponse = await axiosJsonwithAuth(postItemurl, body, config);

      const getCarturl = `http://localhost:8000/api/orders/cart/`;
      const getResponse = await axiosJsonwithAuth(getCarturl);
      setCartItems(getResponse.items);
    } else {
      const existingItem = cartItems.find((i) => i.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        const cartItem = {
          id: item.id,
          product: {
            id: item.id,
            title: item.title,
            author: item.author.name,
            price: item.price,
            image: item.coverImage,
            rating: item.rating,
            description: item.description,
          },
          quantity: quantity,
        };

        updatedCart = [...cartItems, cartItem];
      }
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  }

  async function removeItem(id: number) {
    if (isLoggedin) {
      const deleteItemurl = `http://localhost:8000/api/orders/cart/remove/${id}/`;
      const body = { product_id: id };
      const config = { method: "DELETE" };
      const postResponse = await axiosJsonwithAuth(deleteItemurl, body, config);

      const getCarturl = `http://localhost:8000/api/orders/cart/`;
      const getResponse = await axiosJsonwithAuth(getCarturl);
      setCartItems(getResponse.items);
    } else {
      const updatedCart = cartItems.filter((i) => i.id !== id);
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, isLoading, setCartItems, addItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
