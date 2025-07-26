import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BookCard } from "./BookCard";
import type { Book } from "../assets/types/types";

export function BookSwiper({ books }: { books: Book[] }) {
  return (
    <div className="w-full relative bg-purple-200 rounded-[1rem]">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".prev-button",
          nextEl: ".next-button",
        }}
        slidesPerView="auto"
        spaceBetween={2}
        className="pb-16"
      >
        {books.map((book) => (
          <SwiperSlide
            key={book.id}
            style={{ width: "16rem", padding: "1rem" }}
          >
            <BookCard book={book} />
          </SwiperSlide>
        ))}

        <button className="prev-button text-white absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 border border-indigo-600 rounded-full bg-indigo-600 hover:bg-indigo-400 transition">
          &gt;
        </button>
        <button className="next-button text-white absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 border border-indigo-600 rounded-full bg-indigo-600 hover:bg-indigo-400 transition">
          &lt;
        </button>
      </Swiper>
    </div>
  );
}
