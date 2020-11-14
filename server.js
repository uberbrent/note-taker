const express = require('express');
const path = require('path');
const { createNewNote, removeNote, findId } = require('./lib/notes');
const uniqid = require('uniqid');
let notes = require('./db/db');


//notes = JSON.parse(notes)

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.get('/api/notes/:id', (req, res) => {
    const result = findId(req.params.id, notes);
    res.json(result);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
})

app.delete('/api/notes/:id', (req, res) => {
    const newArray = removeNote(req.params.id, notes);
    notes = newArray
    res.json(newArray)
})

app.listen(PORT, () => {
    console.log(`Note Taker server now on port ${PORT}!`);
})