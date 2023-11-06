// @ts-ignore
import React, { useState } from "react";
import { Book } from "@/types/book";
import BookList from "@/components/ui/BookList";
import {
  useChangeStatusMutation,
  useDeleteBookMutation,
} from "@/store/book/book-api";

interface ToReadProps {
  books: Book[] | undefined;
}

const InProgress = ({ books }: ToReadProps) => {
  const [changeStatus, { isError, isLoading }] = useChangeStatusMutation();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    const response = await deleteBook(id);
  };

  const handleChangeStatus = async (
    id: string,
    status: "completed" | "inprogress" | "toread"
  ) => {
    const response = await changeStatus({ id, status });
  };

  if (isError) {
    return null;
  }
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <BookList
        books={books}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
};

export default InProgress;
