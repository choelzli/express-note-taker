const express = require('express');
const router = express.Router();
const uuid = require('../helpers/uuid');

const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => err ? console.error(err) : res.status(200).json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
    
    fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err) => err ? console.error(err) : console.log(`the note ${JSON.stringify(newNote)} has been added to file`));
            }
    });

        res.status(201).json(newNote);
    } else {
        res.status(500).json('Error');
    }

});

router.delete('/:id', (req, res) => {
    const noteIdToDelete = req.params.id;

    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json('Error reading data');
        } else {
            let parsedNotes = JSON.parse(data);
            const updatedNotes = parsedNotes.filter(note => note.id !== noteIdToDelete);

            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
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