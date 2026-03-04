import express, { Request, Response } from "express";
import { takeCoverage } from "node:v8";

const server = express();
const port = 3000;
server.use(express.json());
// // // const token: string = "1";

// // // server.get("/movie/:type", (req: Request, res: Response) => {
// // //   const query = req.query;
// // //   const params = req.params;
// // //   const headers = req.headers;
// // //   const headersToken = headers.authorization?.split(" ")[1];

// // //   if (headersToken === token) {
// // //     res.status(200).send("success");
// // //   } else {
// // //     res.status(403).send("fail");
// // //   }
// // // });

// // // server.listen(port, () => {
// // //   console.log(`Server is running on port ${port}`);
// // // });
// // server.use(express.json());

// // let books = [
// //   {
// //     id: 1,
// //     title: "Boldoggui bor uvgun",
// //     author: "bat",
// //   },
// //   {
// //     id: 2,
// //     title: "Boldoggui bor uvgun",
// //     author: "bat",
// //   },
// // ];
// // server.get("/books", (req: Request, res: Response) => {
// //   res.status(200).send(books);
// // });
// // server.get("/books/:id", (req: Request, res: Response) => {
// //   const { id } = req.params;
// //   const book = books.find((book) => String(book.id) === String(id));
// //   res.status(200).send(book);
// // });
// // server.post("/books", (req: Request, res: Response) => {
// //   const { title, author } = req.body;

// //   const newBookId = books.length + 1;

// //   const newBook = { id: newBookId, title, author };

// //   books.push(newBook);

// //   res.status(200).send(books);
// // });
// // server.delete("/books/:id", (req: Request, res: Response) => {
// //   const { id } = req.params;

// //   const updatedBooks = books.filter((book) => String(book.id) !== String(id));

// //   res.send(updatedBooks);
// // });
// // server.put("/books/:id", (req: Request, res: Response) => {
// //   const { id } = req.params;

// //   const { title, author } = req.body;

// //   books = books.map((book) => {
// //     if (String(book.id) === id) {
// //       const updatedBook = {
// //         id: book.id,
// //         title: title,
// //         author: author,
// //       };
// //       return updatedBook;
// //     } else {
// //       return book;
// //     }
// //   });
// //   res.status(200).send(books);
// // })
// let todos = [
//   {
//     id: 1,
//     task: "wake up",
//     iscomplete: false,
//   },
// ];
// server.get("/", (req: Request, res: Response) => {
//   res.status(200).send({ message: "All task", todos });
// });

// server.post("/", (req: Request, res: Response) => {
//   const { task } = req.body;

//   const newTaskId = todos.length + 1;
//   const newTask = { id: newTaskId, task, iscomplete: false };

//   todos.push(newTask);
//   res.status(200).send({
//     message: "added task successfully",
//     todos,
//   });
// });

// server.put("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;

//   todos = todos.map((todo) => {
//     if (String(todo.id) === id) {
//       return { ...todo, iscomplete: !todo.iscomplete };
//     }
//     return todo;
//   });
//   res.status(200).send({
//     message: "task updated successfully",
//     todos,
//   });
// });

// server.delete("/:id", (req: Request, res: Response) => {
//   const { id } = req.params;

//   todos = todos.filter((todo) => {
//     if (String(todo.id) !== id) {
//       return todo;
//     }
//   });
//   res.status(200).send({
//     message: "task deleted successfully",
//     todos,
//   });
// });

server.get("/student/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  res.status(200).send(`Sain baina uu ${name}`);
});

server.get("/filter", (req: Request, res: Response) => {
  const { city, age } = req.query;

  res.status(200).json({
    city: city,
    age: age,
  });
});

server.get("/", (req: Request, res: Response) => {
  const headers = req.headers;
  console.log(headers);
  res.status(200).send("ok");
});

server.get("/request", (req: Request, res: Response) => {
  const path = req.path;
  const request = req.method;

  res.status(200).send(`Ta ${path} zam ruu ${request} huselt yvuullaa`);
});

server.get("/library/:category/:bookId", (req: Request, res: Response) => {
  const { category, bookId } = req.params;
  const auth = req.headers;
  const path = req.path;
  const method = req.method;
  const { lang } = req.query;

  if (auth["x-api-key"] !== "1234") {
    res.status(401).send("Хандах эрхгүй");
  } else {
    res.status(200).json({
      status: "Амжилттай",
      request_info: {
        method: method,
        path: path,
      },
      exctracted_data: {
        category: category,
        id: bookId,
        language: lang,
        auth: "Verified",
      },
    });
  }
});

server.listen(port, () => {
  console.log(`Listening ${port}`);
});
