const path = require('path');
const fs = require('fs');

function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
};

function removeNote(noteId, array) {
    newArray = array.filter(element => element.id !== noteId)
    console.log(newArray)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(newArray, null, 2)
    );
    return newArray
}

function findId(id, array) {
    const result = array.filter(note => note.id === id)[0]
    return result
}

module.exports = {
    createNewNote,
    removeNote,
    findId
}