import sqlite3




def seed_db():
    # Create a SQLite database and the 'books' table
    conn = sqlite3.connect("books.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS books (
            id TEXT PRIMARY KEY ,
            title TEXT NOT NULL,
            status TEXT NOT NULL
        )
        """
    )

    cursor.execute("INSERT OR IGNORE INTO books (id,title,status) VALUES (?,?,?)", ("56696b81-ad36-4456-bab5-0c3a0a515948","Dummy Book Title", "toread"))

    conn.commit()
    conn.close()

