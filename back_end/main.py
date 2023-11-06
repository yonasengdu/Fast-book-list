from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from models import Book
from repository import BookRepository
from db import seed_db
# Create the FastAPI app
seed_db()

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Create an instance of the BookRepository class
repo = BookRepository()

# Define the API endpoints for the book resource

# Create a new book
@app.post("/books")
async def create_book(book: Book):
    id = repo.insert_book(book)
    return {"status":201,"id": id, "message": "Book created successfully"}

# Get a book by id
@app.get("/books/{id}")
def get_book(id: str):
    book = repo.get_book(id)
    if book:
        return {"status":200,"detail":book}
    else:
        raise HTTPException(status_code=404, detail="Book not found")

# Get all books
@app.get("/books")
def get_all_books():
    books = repo.get_all_books()
    return {"status":200,"detail":books}

# Update a book by id
@app.put("/books/{id}")
def update_book(id: str, status: str):
    
    rows = repo.update_book(id, status)
    if rows and rows > 0:
        return {"status":201,"message": "Book updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Book not found")

# Delete a book by id
@app.delete("/books/{id}")
def delete_book(id: str):


    rows = repo.delete_book(id)
    if rows > 0:
        return {"status":201,"message": "Book deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Book not found")
