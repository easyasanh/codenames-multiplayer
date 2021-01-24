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

var cards = generateCardColours();

setInterval(function() {
    io.sockets.emit('words', getWords());
    io.sockets.emit('cards', cards);
}, 1000);

var players = {};
var playerName;

var redOperatives = new Set();
var redSpymasters = new Set();
var blueOperatives = new Set();
var blueSpymasters = new Set();


var redScore = 8;
var blueScore = 9;


var guessedCards = [];

var clueMessage = "";

// add words

function getWords() {
  const fs = require('fs');

  let txtFile = "used_words/words.csv";
  let str = fs.readFileSync(txtFile,'utf8');
  var words = str.split(",");
  return words
}

function generateCardColours() {
  var cards = [0, 0, 0, 0, 0, 0, 0, 0,  // red
    1, 1, 1, 1, 1, 1, 1, 1, 1,  // blue
    2, 2, 2, 2, 2, 2, 2,  // neutral
    3]; // black
  return shuffle(cards);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




io.on('connection', function(socket) {

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

  socket.on('redScore', function(data) {
    redScore = data;
  });

  socket.on('blueScore', function(data) {
    blueScore = data;
  });

  socket.on('newGuessedCards', function(data) {
    guessedCards = data;
  });

  socket.on('clueMessage', function(data) {
    clueMessage = data;
  });

});

setInterval(function() {
    io.sockets.emit('state', players);

    io.sockets.emit('redOperatives', Array.from(redOperatives).join(', '));
    io.sockets.emit('redSpymasters', Array.from(redSpymasters).join(', '));
    io.sockets.emit('blueOperatives', Array.from(blueOperatives).join(', '));
    io.sockets.emit('blueSpymasters', Array.from(blueSpymasters).join(', '));

    io.sockets.emit('redScore', redScore);
    io.sockets.emit('blueScore', blueScore);
    
    io.sockets.emit('guessedCards', guessedCards);

    io.sockets.emit('clueMessage', clueMessage);
}, 1000 / 60);