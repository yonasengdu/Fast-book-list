import { Book } from '@/types/book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.59.149:8000';

export const booksApi = createApi({
    reducerPath: 'books',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['books'],
    endpoints: (builder) => ({
        getBooks: builder.query<any, void>({
            query: () => '/books',
            providesTags: ['books']
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
              url: '/books',
              method: 'POST',
              body: {
                "title" : newBook
            },
            }),
            invalidatesTags: ['books'],
          }),

        changeStatus: builder.mutation<void, {id:string, status:string}>({
            query: (book) => ({
                url: `/books/${book.id}?status=${book.status}`,
                method: 'PUT',
                
                
            }),
            invalidatesTags: ['books'],
            }),

        deleteBook: builder.mutation({
            query: (id) => (
                {
                url: `/books/${id}`,
                method: 'DELETE',
              
            }),
            invalidatesTags: ['books'],
            }),
    
    })
});

export const {useGetBooksQuery, useAddBookMutation, useChangeStatusMutation, useDeleteBookMutation} = booksApi
