const express = require('express');
const configureMiddleware = require('./config/middleware');

const helpers = require('./helpers/index');

const server = express();

//middleware 
configureMiddleware(server);

//routes end points

server.get('/', (req, res) => {
    res.send('And God saw all that He had made, and found it very good');
});

server.get('/projects', function (req, res) {
    helpers
        .getProjects()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: ` Failed to get Projects`, error: err });
    });
});

server.get('/actions', function (req, res) {
    helpers
        .getActions()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: ` Failed to get Actions`, error: err });
        });
});


module.exports = server
