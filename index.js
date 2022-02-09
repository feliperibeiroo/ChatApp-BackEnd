require('dotenv').config()
const express = require('express');
var crypto = require('crypto');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: { 
        origin: process.env.ORIGIN 
    }
});

const port = process.env.PORT

var clientsWaiting = []
var clientsConnected = []

io.on('connection', (client) => {
    io.on('readyToConnect', () => clientsWaiting.append(client))
});

setInterval(() => {
    if(clientsWaiting.length>=2) {
        
    }
}, 100);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});