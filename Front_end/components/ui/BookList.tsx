// @ts-ignore

import React, { useState } from "react";

import { Book } from "@/types/book";

interface BookListProps {
  books: Book[] | undefined;
  onDelete: (id: string) => void;
  onChangeStatus: (
    id: string,
    status: "completed" | "inprogress" | "toread"
  ) => void;
}

const BookList = ({ books, onDelete, onChangeStatus }: BookListProps) => {
  if (!books) {
    return null;
  }
  return (
    <ul className="divide-y divide-gray-200">
      {books?.map((book) => (
        <li
          key={book.id}
          className="flex px-64 justify-between items-center py-8"
        >
          <span className="text-lg">{book.title}</span>
          <div className="flex space-x-8">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => onDelete(book.id)}
            >
              Delete
            </button>
            <select
              value={book.status}
              onChange={(e) =>
                onChangeStatus(
                  book.id,
                  e.target.value as "completed" | "inprogress" | "toread"
                )
              }
              className="bg-blue-200 text-blue-700 px-2 py-1 rounded"
            >
              <option value="completed">Completed</option>
              <option value="inprogress">In Progress</option>
              <option value="toread">To Read</option>
            </select>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
