"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {useAddBookMutation} from 'store/book/book-api'

const CreateNewBook = () => {
    const [addBook, {isError, isLoading}] = useAddBookMutation();
    const [title, setTitle] = useState("");
    const [isSubmited, setIsSubmited] = useState(false)
    const router = useRouter()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
      };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            
            const response:any = await addBook(title)
            console.log(response)
            
            if (response.data.status === 201) {
                setIsSubmited(!isSubmited)
                router.push('/')
                
            }else{
            return "error"
            
            }
                
        } catch (error) {
            
        }      
    };
 
  return (
    <form className='pl-16 pr-16 pt-16 mb-64'>
    <div className="flex flex-col md:grid grid-cols-4 md:pl-16 md:pr-16 pt-16 h-screen mb-48">
      <div className=" flex flex-col gap-8 md:col-span-3 rounded-lg  max-w-screen-lg w-full">
        <div className="bg-white border-l-4 border-primary p-4">
            <input
                type="text"
                placeholder="Enter the title"
                className="border-none rounded-full text-sm md:text-3xl focus:outline-none"
                value={title}
                onChange={handleTitleChange}
            />
        </div>

            <button
                className="mt-4 bg-primary w-1/4 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>

      </div>
    </div>
  </form>
  )
}

export default CreateNewBook