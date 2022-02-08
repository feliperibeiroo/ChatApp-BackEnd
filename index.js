const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = {
    origin: "http://10.86.201.246:4000/"
  }
const io = require('socket.io')(server, cors);

io.on('connection', client => {
    console.log('Cliente conectado: ', client)
    client.on('msg', data => {console.log(data)});
    client.on('disconnect', () => {console.log('Cliente desconectado!');});
  });

server.listen(8080, () => {
  console.log('listening on *:8080');
});