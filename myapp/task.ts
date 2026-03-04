import express, { Request, Response } from "express";
const server = express();
const port = 3000;
server.use(express.json());

server.get("/student/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  res.status(200).send(`Sain baina uu ${name}`);
});

server.listen(port, () => {
  console.log(`Server is on ${port}`);
});
