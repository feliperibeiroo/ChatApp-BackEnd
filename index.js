require('dotenv').config()
const express = require('express');
var crypto = require('crypto');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: { 
        origin: process.env.ORIGIN || '*'
    }
});

const port = process.env.PORT || 8080

var clientsWaiting = []
var clientsConnected = []

app.get('/', (req, res) => {
    res.send('Teste Realizado!')
})

io.on('connection', (client) => {
    clientsWaiting.push(client.id)
    console.log(`Cliente ${client.id} conectado!`);

    client.on("disconnect", () => {
        if(clientsWaiting.indexOf(client.id)!=-1) clientsWaiting.splice(clientsWaiting.indexOf(client.id), 1);
        if(clientsConnected.indexOf(client.id)!=-1) clientsConnected.splice(clientsConnected.indexOf(client.id), 1);
        client.broadcast.emit('disconnected', client.id)
    });
    client.on("msg", (anotherClientId, msg) => {
        client.to(anotherClientId).emit('msg', client.id, msg)
    });
    client.on('next', (anotherClientId) => {
        clientsWaiting.push(clientsConnected.splice(clientsConnected.indexOf(client), 1)[0], clientsConnected.splice(clientsConnected.indexOf(anotherClient), 1)[0])
        client.disconnect(true)
        io.sockets.sockets.get(anotherClientId).disconnect(true)
    })
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setInterval(() => {
    if(clientsWaiting.length>=2) {
        [client1, client2] = clientsWaiting.splice(0, 2)
        clientsConnected.push(client1, client2)
        io.to(client1).emit('joined', client2)
        io.to(client2).emit('joined', client1)
    }
}, 1000);
