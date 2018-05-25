const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.send([
        { firstName: 'Andrew', lastName: 'Mead', age: 25 },
        { firstName: 'Anthony', lastName: 'Gilliam', age: 35 }
    ]);
});

app.listen(3000);

module.exports = { app };