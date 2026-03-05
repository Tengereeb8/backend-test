import express, { Request, Response } from "express";
import { readBooks } from "./utils/books-read";
import fs from "node:fs/promises";
import { webcrypto } from "node:crypto";

const server = express();
const port = 3000;
server.use(express.json());

server.get("/books", async (req: Request, res: Response) => {
  const books = await readBooks();

  if (!books) {
    return res.status(500).json({
      message: "failed",
      books: [],
    });
  }

  const parsedBooks = JSON.parse(books);

  res.status(200).json({
    message: "success",
    books: parsedBooks,
  });
});

server.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const books = await readBooks();

  if (!books) {
    return res.status(200).json({
      message: "failed",
      books: [],
    });
  }

  const parsedBooks: Book[] = JSON.parse(books);

  const book = parsedBooks.find((book) => String(book.id) === String(id));

  if (!book) {
    return res.status(404).json({
      message: "No shit like that",
      book: [],
    });
  }

  return res.status(200).json({
    message: `book number ${id}`,
    book: book,
  });
});

server.post("/books", async (req: Request, res: Response) => {
  const { title } = req.body;

  const books = await readBooks();

  if (!books) {
    return res.status(200).json({
      message: "failed",
      books: [],
    });
  }

  const parsedBooks: Book[] = JSON.parse(books);

  const newBookId = parsedBooks.length + 1;

  const newBook = { id: newBookId, title: title };

  parsedBooks.push(newBook);

  const data = JSON.stringify(parsedBooks);

  const writeBook = async () => {
    try {
      fs.writeFile("./books.json", data);
    } catch (err) {
      console.error(err);
    }
  };
  writeBook();
  res.status(200).json({ message: "Success", book: parsedBooks });
});

server.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await readBooks();

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    const parsedBooks: Book[] = JSON.parse(data);

    const bookExists = parsedBooks.find((b) => String(b.id) === id);
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newBooks = parsedBooks.filter((book) => String(book.id) !== id);

    await fs.writeFile("./books.json", JSON.stringify(newBooks, null, 2));

    res.status(200).json({ message: "Successfully deleted", books: newBooks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

server.listen(port, () => {
  console.log(`Listening ${port}`);
});

type Book = {
  id: number;
  title: string;
};
