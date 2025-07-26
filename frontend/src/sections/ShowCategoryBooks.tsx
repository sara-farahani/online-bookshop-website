import { useEffect, useState, useRef } from "react";
import { BookSwiper } from "../components/BookSwipper";
import { axiosJson } from "../lib/api/axios";
import { categories, contentTypes } from "../constants";
import type { Book } from "../assets/types/types";

const ShowCategoryBooks = ({
  selectedCategory = "0",
  selectedContentType = "0",
}: {
  selectedCategory?: string;
  selectedContentType?: string;
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  // TODO: write a buildURL function to generate specific url for each request
  const url = "http://localhost:8000/api/store/books/";
  const selectedCategoryName = categories
    .filter((c) => c.category === selectedCategory)
    .map((c) => c.name)[0];
  const selectedContentTypeName = contentTypes
    .filter((c) => c.contentType === selectedContentType)
    .map((c) => c.name)[0];
  const selectedContentTypes = contentTypes
    .filter((c) => c.contentType === selectedContentType)
    .map((c) => c.type)[0];
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await axiosJson(url);
        // TODO: filter books in the backend (store)
        const selectedBooks = fetchedBooks.filter((book) => {
          return (
            (selectedCategory === "0" ||
              book.categories.some(
                (cat) => cat.name === selectedCategoryName
              )) &&
            (selectedContentType === "2" || book.type === selectedContentTypes)
          );
        });
        setBooks(selectedBooks);
      } catch (error) {
        console.error("خطا در دریافت کتاب‌ها:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-16 px-14">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {selectedContentType === "2"
              ? selectedCategoryName
              : selectedContentTypeName}
          </h2>
          <a href="/books" className="text-primary hover:underline text-md">
            مشاهده همه
          </a>
        </div>

        <BookSwiper books={books} />
      </div>
    </section>
  );
};

export default ShowCategoryBooks;
