import express from "express";
import type { Response, Request } from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello this is get req");
});
app.post("/", (req, res) => {
  res.send("POST");
});
app.delete("/", (req, res) => {
  res.send("Delete request");
});
app.put("/", (req, res) => {
  res.send("Put request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
