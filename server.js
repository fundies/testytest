const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});
const { spawn } = require('child_process');

// serve the static files from the client directory
app.use(express.static('client'));

// listen for 'run-command' events from socket.io clients
io.on('connection', (socket) => {
  socket.on('run-command', (data) => {
    const { command, args } = data;

    // run the command using the child_process module
    const child = spawn(command, args);

    // listen for the 'stdout' event to receive the output of the command
    child.stdout.on('data', (data) => {
      // emit the output to the socket.io client
      socket.emit('command-output', data);
    });

    // listen for the 'stderr' event to receive any errors
    child.stderr.on('data', (data) => {
      // emit the error to the socket.io client
      socket.emit('command-error', data);
    });

    // listen for the 'close' event to know when the command has completed
    child.on('close', (code) => {
      // emit the completion event to the socket.io client
      socket.emit('command-complete', code);
    });
  });
});

// start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
     

