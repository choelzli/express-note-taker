const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3001;
const api = require('./routes/notes')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);

app.get('/', (req, res) => {
    res.sendFile('/public/index.html')
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => 
    console.log(`Express server listening on Port ${PORT}.`)
);