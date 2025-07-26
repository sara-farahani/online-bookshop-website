import { useEffect, useState } from "react";
import { useCart } from "../../contexts/cart";
import { axiosJson } from "../../lib/api/axios";

function BookDetails({ bookID }: { bookID: string }) {
  const { addItem } = useCart();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const url = `http://localhost:8000/api/store/books/${bookID}/`;
        const res = await axiosJson(url);
        setBook(res);
      } catch (error) {
        // TODO: Handle Error
        console.error("ERROR FETCHING BOOK", error);
      }
    }
    fetchBook();
  }, [bookID]);

  if (!book) return <p>در حال بارگذاری...</p>;

  return (
    <div className="py-24 ">
      <div className="flex justify-center mt-10">
        <div className="flex flex-col md:flex-row shadow p-4 gap-6 w-[90%] max-w-5xl">
          <div className="flex flex-col bg-purple-300 rounded-2xl items-center text-center w-full md:w-2/3">
            <img
              src={book.coverImage}
              alt="جلد کتاب"
              className="w-48 h-48 mt-3 bg-white rounded-lg shadow-md object-cover mb-4"
            />
            <h1 className="text-xl font-bold mt-1">{book.title}</h1>
            <p className="text-sm text-gray-700 mt-2">
              نویسنده: <span className="font-semibold">{book.author.name}</span>
            </p>
          </div>

          <div className="flex flex-col bg-purple-300 rounded-2xl w-full md:w-1/3">
            <div className="space-y-4 mt-2">
              <div className="flex justify-between items-center">
                <div className="bg-yellow-400 text-white rounded-full mr-2 px-2 py-1 flex items-center gap-1 shadow">
                  <span className="text-lg">⭐</span>
                  <span className="text-base font-bold">{book.rating}</span>
                </div>

                <p className="bg-blue-400 ml-2 text-white rounded-full px-3 py-1 flex items-center gap-1 shadow text-sm text-gray-700">
                  {book.type === "ebook" ? "📘 متنی" : "👂 صوتی"}
                </p>
              </div>

              <div className="text-2xl p-5 font-bold text-green-700">
                {Number(book.price).toLocaleString()} تومان
                {/* <span className="text-sm text-gray-400 line-through mr-2">
                  {book.off}
                </span> */}
                {/* <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                  {book.offPercentage}
                </span> */}
              </div>

              {/* TODO: add an element for selecting the quantity of selcted item to add to the cart */}
              <button
                className="w-[60%] bg-black text-white rounded-xl py-3 text-lg font-semibold hover:bg-gray-800 transition"
                onClick={() => addItem(book)}
              >
                افزودن به سبد خرید
              </button>

              <button className="w-[60%]  border-none rounded-xl py-2 bg-gray-300 hover:bg-gray-200">
                <span>▶️</span>
                <span>نمونه</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <div className="bg-purple-200 text-pink-800 p-3 w-[90%] rounded-xl">
          <h2 className="text-right text-xl font-bold mb-2 border-b pb-2">
            دربارهٔ کتاب
          </h2>
          <p className="text-justify text-gray-700 leading-7">
            {book.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
