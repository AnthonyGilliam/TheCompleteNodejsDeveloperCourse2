console.log('Starting notes.js\n');

const fs = require('fs');

const notesPath = 'notes-data.json';

const logNote = (note) => {
    console.log('Title:', note.title);
    console.log('Body:', note.body, '\n');
};

const fetchNotes = () => {
    let notes = [];
    try {
        let notesFile = fs.readFileSync(notesPath);
        notes = JSON.parse(notesFile) || [];
    } catch(err){
        console.log(`The file ${notesPath} does not exist. Creating new one.\n`);
    }
    return notes;
};

const saveNotes = (notes) => {
    fs.writeFileSync(notesPath, JSON.stringify(notes));
};

const addNote = (title, body) => {
    console.log(`Saving note '${title}' with body:  '${body}' to filesystem\n`);

    let notes = fetchNotes();

    if(notes.filter(note => note.title === title).length) {
        console.error(`Error:  A note named ${title} already exists. No note saved.`);
        return;
    }

    let note = {
        title,
        body
    };

    notes.push(note);
    saveNotes(notes);
    console.log(title, 'saved!\n');
};

const getAll = () => {
    console.log('Getting All notes\n');
    return fetchNotes();
};

const getNote = (title) => {
    console.log('Getting note: ', title, '\n');
    let notes = fetchNotes();
    let filteredNote = notes.filter((note) => note.title === title);
    if(!filteredNote.length)
        console.error(`Error:  Note named ${title} does not exists. Cannot read.`);
    else
        return filteredNote[0];
};

const removeNote = (title) => {
    console.log('Removing note: ', title, '\n');
    let notes = fetchNotes();
    let notesToSave = notes.filter((note) => note.title !== title);
    if(notesToSave.length === notes.length) {
        console.error(`Error:  Note named ${title} does not exists. Cannot remove.`);
        return;
    }
    saveNotes(notesToSave);
    console.log(title, 'removed!\n');
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};