// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
    console.log('Starting server on port 5000');
  });

// Add the WebSocket handlers
io.on('connection', function(socket) {
});

setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);

var players = {};
var playerName;

var blueOperatives = new Set();
var blueSpymasters = new Set();
var redOperatives = new Set();
var redSpymasters = new Set();

io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });


  socket.on('redOperativeName', function(data) {
    playerName = data;
    redOperatives.add(playerName)
    io.sockets.emit('redOperatives', Array.from(redOperatives).join(', '))
  });

  socket.on('redSpymasterName', function(data) {
    playerName = data;
    redSpymasters.add(playerName)
    io.sockets.emit('redSpymasters', Array.from(redSpymasters).join(', '))
  });

});

setInterval(function() {
    io.sockets.emit('state', players);
    io.sockets.emit('blueOperatives')
}, 1000 / 60);