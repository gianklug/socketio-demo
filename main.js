const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve the client app
app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
});


// Show that a user has connected
io.on('connection', (socket) => {
	  console.log('a user connected');
});


// Send a random hex color as a websocket
function changeColor() {
	io.emit('message', Math.floor(Math.random()*16777215).toString(16));
}


// Start the server and run the changeColor function
// every 250ms
server.listen(3000, () => {
	  console.log('listening on *:3000');
	setInterval(() => { changeColor(); }, 250);
});


