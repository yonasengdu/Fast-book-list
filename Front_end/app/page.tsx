"use client";
import Link from "next/link";
import React, { useState } from "react";
import ToRead from "./to-read/page";
import InProgress from "./in-progress/page";
import Completed from "./completed/page";
import { useGetBooksQuery } from "@/store/book/book-api";
import { json } from "stream/consumers";
import { Book } from "@/types/book";

export const Home = () => {
  const { data: books, error, isLoading } = useGetBooksQuery();
  console.log(books)
  

  const toRead = books?.detail.filter((book :Book ) => book.status === "toread")
  const inProgress = books?.detail.filter((book  :Book ) => book.status === "inprogress")
  const completed = books?.detail.filter((book  :Book ) => book.status === "completed")

  const [val, setVal] = useState<number>(0);
  const [isActive, setIsActive] = useState<number>(0);

  if (error) {
    return <h1 className="flex justify-center items-center">Error occured</h1>
  }

  if (isLoading) {
    return <h1 className="flex justify-center items-center">Loading</h1>
  }

  return (
    <>
      <section className="w-[98%] font-Montserrat mx-auto p-2 m-2 ">
        <div className="border-b-2 ">
          <p className="text-lg font-bold">Books</p>

          <div className="flex justify-around mt-6">
            <div className="flex justify-center items-center gap-5">
              <Link
                onFocus={() => setIsActive(0)}
                href={"#"}
                onClick={() => setVal(0)}
                className={`${
                  isActive === 0 ? "border-primary text-primary border-b-4" : ""
                } font-semibold px-4 py-3  rounded-sm`}
              >
                To read
              </Link>

              <Link
                onFocus={() => setIsActive(1)}
                href={"#"}
                onClick={() => setVal(1)}
                className={`${
                  isActive === 1 ? "border-primary text-primary border-b-4" : ""
                } font-semibold px-4 py-3  rounded-sm`}
              >
                In progress
              </Link>

              <Link
                onFocus={() => setIsActive(2)}
                href={"#"}
                onClick={() => setVal(2)}
                className={`${
                  isActive === 2 ? "border-primary text-primary border-b-4" : ""
                } font-semibold px-4 py-3 rounded-sm  `}
              >
                Completed
              </Link>
            </div>

            <Link
              href={"/create"}
              className="  font-bold  bg-primary text-white px-10 py-1 rounded-lg mb-1 flex items-center"
            >
              Add New Book
            </Link>
          </div>
        </div>

        {val === 0 && <ToRead books={toRead}/>}
        {val === 1 && <InProgress books={inProgress}/>}
        {val === 2 && <Completed books={completed}/>}
      </section>
    </>
  );
};

export default Home;
