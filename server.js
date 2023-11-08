const express = require('express');
const path = require('path');
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// GET Route for notepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET Route for /api/notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

// POST Route for /api/notes
app.post('/api/notes', (req, res) => {
    let databaseNotes= JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let createNote= req.body;
    let newID= databaseNotes.length.toString();
    createNote.id= newID;
    databaseNotes.push(createNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(databaseNotes));
    res.json(databaseNotes);
});


// GET Route for *
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);