from dataclasses import dataclass


@dataclass
class Book:
    id: str = "" # Default value for id field
    title: str = ""
    status: str = "toread"

