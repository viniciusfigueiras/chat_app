import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import * as http from 'http';
import express from 'express';
import port from '../src/config.js';
import generateMessage from '../src/utils/messages.js';

import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectoryPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);

app.use(express.static(publicDirectoryPath));

const io = new Server(server, {
  // ...
});

io.on("connection", (socket) => {
    socket.emit('message', generateMessage('Welcome!'));

    socket.broadcast.emit('message', generateMessage('A new user has joined chat!'));
    socket.on('sendMessage', (message, callback) => {
        io.emit('message', generateMessage(message));
        callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left chat!'));
  });
});

server.listen(port, () => {
   console.info(`Your app is listening a http://localhost: ${port}`);
 });