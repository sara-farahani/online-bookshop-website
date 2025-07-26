import { useState } from "react";
import ConfirmRemoveCart from "./ConfirmRemoveCart";
import { useCart } from "../contexts/cart";

export default function CartPage() {
  const { cartItems, isLoading, removeItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      removeItem(itemToDelete);
      setItemToDelete(null);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setIsModalOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">سبد خرید شما</h1>
      {isLoading && <p>در حال بارگذاری سبد خرید...</p>}
      {cartItems.length === 0 && !isLoading ? (
        <p className="text-center text-gray-500">سبد خرید خالی است 🛒</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow p-4 gap-4"
              >
                <img
                  src={item.product.coverImage}
                  alt={item.product.title}
                  className="w-28 h-28 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-600">
                    نویسنده: {item.product.author}
                  </p>
                  <p className="mt-2 text-green-700 font-bold text-lg">
                    {(item.product.price * item.quantity).toLocaleString()}{" "}
                    تومان
                  </p>
                  <p className="text-gray-500 text-sm">
                    تعداد: {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center bg-gray-100 rounded-xl p-4">
            <span className="text-xl font-bold">
              جمع کل: {totalPrice.toLocaleString()} تومان
            </span>
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
              پرداخت
            </button>
          </div>
        </>
      )}

      <ConfirmRemoveCart
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="آیا مطمئنی می‌خواهی این آیتم را حذف کنی؟"
      />
    </div>
  );
}
