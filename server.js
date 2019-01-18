const express = require('express');
const configureMiddleware = require('./config/middleware');

const server = express();

//middleware 
configureMiddleware(server);

//routes 

server.get('/', (req, res) => {
    res.send('And God saw all that He had made, and found it very good');
});

module.exports = server 
