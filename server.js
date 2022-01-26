const express = require("express");
const { readFile, fstat, appendFile } = require("fs");
const path = require("path");

const app = express();

const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// The problem
app.get("/api/notes", (req, res) => {
  readFile("db/db.json", (err, data) => {
    if (err) throw err;
    const currentNotes = JSON.parse(data);
    res.json(currentNotes);
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  appendFile("./db/db.json", JSON.stringify(req.body), (err) => {
    if (err) throw err;
    console.log("The data was appended to file!");
  });
  res.status(200).end();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
