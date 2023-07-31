const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    readFromFile('./db/db.json', (err, data) => err ? console.error(err) : res.status(200).json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    const { title, note } = req.body;

    if(title && note) {
        const newNote = {
            title,
            note
        };
    
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

router.delete('/:id', (req, res) => {
    const noteIdToDelete = req.params.id;

    readFromFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json('Error reading data');
        } else {
            const notes = JSON.parse(data);
            const updatedNotes = notes.filter(note => note.id !== noteIdToDelete);

            writeToFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json('Error writing data');
                } else {
                    res.status(200).json('Note deleted successfully');
                }
            });
        }
    });
});

module.exports = router;