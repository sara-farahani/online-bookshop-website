export interface Book {
  id: string;
  title: string;
  coverImage: string;
  author: { id: string; name: string; bio: string }[];
  price: number;
  rating: number;
  category: [];
  type: string;
}

export type CartItem = {
  id: number;
  product: {
    id: number;
    title: string;
    author: [];
    price: number;
    image: string;
    rating: number;
  };
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (CartItem: CartItem) => void;
  removeItem: (id: number) => void;
};
