import express, { Request, Response } from "express";

const server = express();
const port = 3000;
// const token: string = "1";

// server.get("/movie/:type", (req: Request, res: Response) => {
//   const query = req.query;
//   const params = req.params;
//   const headers = req.headers;
//   const headersToken = headers.authorization?.split(" ")[1];

//   if (headersToken === token) {
//     res.status(200).send("success");
//   } else {
//     res.status(403).send("fail");
//   }
// });

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
server.use(express.json());

let books = [
  {
    id: 1,
    title: "Boldoggui bor uvgun",
    author: "bat",
  },
  {
    id: 2,
    title: "Boldoggui bor uvgun",
    author: "bat",
  },
];
server.get("/books", (req: Request, res: Response) => {
  res.status(200).send(books);
});
server.get("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((book) => String(book.id) === String(id));
  res.status(200).send(book);
});
server.post("/books", (req: Request, res: Response) => {
  const { title, author } = req.body;

  const newBookId = books.length + 1;

  const newBook = { id: newBookId, title, author };

  books.push(newBook);

  res.status(200).send(books);
});
server.delete("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedBooks = books.filter((book) => String(book.id) !== String(id));

  res.send(updatedBooks);
});
server.put("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, author } = req.body;

  books = books.map((book) => {
    if (String(book.id) === id) {
      const updatedBook = {
        id: book.id,
        title: title,
        author: author,
      };
      return updatedBook;
    } else {
      return book;
    }
  });
  res.status(200).send(books);
});

server.listen(port, () => {
  console.log(`Listening ${port}`);
});
