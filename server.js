const express = require("express");
const { readFile, fstat, appendFile, writeFile } = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  readFile("db/db.json", (err, data) => {
    if (err) throw err;
    const currentNotes = JSON.parse(data);
    res.json(currentNotes);
  });
});

app.post("/api/notes", (req, res) => {
  readFile("db/db.json", (err, data) => {
    if (err) throw err;
    const currentNotes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = Date.now();
    currentNotes.push(req.body);
    writeFile("db/db.json", JSON.stringify(currentNotes), (err) => {
      if (err) throw err;
    });
    res.json(currentNotes);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
