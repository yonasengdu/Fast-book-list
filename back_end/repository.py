import sqlite3
import uuid
from models import Book

class BookRepository:
    def __init__(self, db_path="books.db"):
        self.db_path = db_path

    def insert_book(self, book: Book) -> int:
        
        try: 
            conn = sqlite3.connect(self.db_path)
            new_id  = uuid.uuid4()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO books (id,title,status) VALUES (?,?,?)", (str(new_id),book.title,book.status))
            conn.commit()  
            conn.close()
            return new_id
        except:
            return None

    def get_book(self, book_id: str) -> Book:
        
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM books WHERE id=?", (book_id,))
            row = cursor.fetchone()
            conn.close()
            if row:
                return Book(*row)
            return None
        except:
            return None

    def update_book(self, id:str, status: str):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("UPDATE books SET status=? WHERE id=?", (status, id))
            conn.commit()
            rows_affected = cursor.rowcount  # Get
            conn.close()
            return rows_affected
        except:
            return None

    def delete_book(self, book_id: str) -> int:
        
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("DELETE FROM books WHERE id=?", (book_id,))
            rows_affected = cursor.rowcount  # Get the number of rows affected
            conn.commit()
            conn.close()
            return rows_affected
        except:
            return None
    
    def get_all_books(self) :
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM books")
            rows = cursor.fetchall()
            conn.close()
            
            books = [Book(*row) for row in rows]
            return books
        except:
            return None
