// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.use(express.static('public'))

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
    io.sockets.emit('words', getWords());
}, 1000);

var players = {};
var playerName;

var redOperatives = new Set();
var redSpymasters = new Set();
var blueOperatives = new Set();
var blueSpymasters = new Set();

// add words

function getWords() {
  const fs = require('fs');

  let txtFile = "used_words/words.csv";
  let str = fs.readFileSync(txtFile,'utf8');
  var words = str.split(",");
  return words
}


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
    redOperatives.add(playerName);
  });

  socket.on('redSpymasterName', function(data) {
    playerName = data;
    redSpymasters.add(playerName);
  });

  socket.on('blueOperativeName', function(data) {
    playerName = data;
    blueOperatives.add(playerName);
  });

  socket.on('blueSpymasterName', function(data) {
    playerName = data;
    blueSpymasters.add(playerName);
  });


});

setInterval(function() {
    io.sockets.emit('state', players);
    
    io.sockets.emit('redOperatives', Array.from(redOperatives).join(', '));
    io.sockets.emit('redSpymasters', Array.from(redSpymasters).join(', '));
    io.sockets.emit('blueOperatives', Array.from(blueOperatives).join(', '));
    io.sockets.emit('blueSpymasters', Array.from(blueSpymasters).join(', '));
}, 1000 / 60);