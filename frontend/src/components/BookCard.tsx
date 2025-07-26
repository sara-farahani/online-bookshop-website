import { Link } from "react-router-dom";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`}>
      <div className="flex-col justify-center w-48 h-80 bg-purple-300 rounded-xl border-none shadow-md overflow-hidden border relative">
        <img
          src={book.coverImage}
          alt={book.name}
          className="w-full h-50 object-cover rounded-md"
        />
        <div className="mt-2 space-y-1 text-center">
          <h2 className="text-l font-bold text-gray-800">{book.name}</h2>

          <p className="text-sm text-gray-600">{book.author?.name}</p>

          <div className="text-md font-bold text-gray-800 mt-2">
            {Number(book.price).toLocaleString("fa-IR")}{" "}
            <span className="text-sm">تومان</span>
          </div>
          <div className="flex justify-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < book.rating ? "#FFD700" : "none"}
                viewBox="0 0 24 24"
                stroke="#facc15"
                className="w-[18px] h-5 mr-1"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
