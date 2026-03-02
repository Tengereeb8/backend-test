"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", (req, res) => {
    res.send("POST request");
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
