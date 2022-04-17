const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketIo = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
socketIo.on('connection', (socket) => {
    console.log('a user connected');
    socketIo.emit('user count', socketIo.engine.clientsCount);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socketIo.emit('user count', socketIo.engine.clientsCount);
    });
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});