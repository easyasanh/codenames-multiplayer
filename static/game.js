var socket = io();

var role = "spectator";
var teamTurn = "blueSpymaster"; // blueSpymaster -> blueOperative -> redSpymaster -> redOperative
var clue = "";

// card elements
var button0 = document.getElementById('button0');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');
var button6 = document.getElementById('button6');
var button7 = document.getElementById('button7');
var button8 = document.getElementById('button8');
var button9 = document.getElementById('button9');
var button10 = document.getElementById('button10');
var button11 = document.getElementById('button11');
var button12 = document.getElementById('button12');
var button13 = document.getElementById('button13');
var button14 = document.getElementById('button14');
var button15 = document.getElementById('button15');
var button16 = document.getElementById('button16');
var button17 = document.getElementById('button17');
var button18 = document.getElementById('button18');
var button19 = document.getElementById('button19');
var button20 = document.getElementById('button20');
var button21 = document.getElementById('button21');
var button22 = document.getElementById('button22');
var button23 = document.getElementById('button23');
var button24 = document.getElementById('button24');

var turnBanner = document.getElementById('turnBanner');

var buttonElements = [];
buttonElements.push(button0, button1, button2, button3, button4, button5, button6, button7, button8, button9,
    button10, button11, button12, button13, button14, button15, button16, button17, button18, button19,
    button20, button21, button22, button23, button24);


function showRules() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function createCards(context) {
  for (i = 50; i < 1050; i+=200) {
    for (j = 0; j < 650; j+=130) {    
        context.fillStyle = "#C2C1C2";
        context.fillRect(i, j, 190, 120);
    }
  }
}

function giveClue() {
  var wordField = document.getElementById('clueWord');
  var numberField = document.getElementById('clueNumber');
  var word = wordField.value;
  var number = numberField.value;

  var clueMessage = teamTurn + " gave clue: " + word + ", " + number;
  console.log(role + " gave clue: " + word + ', ' + number);

  socket.emit('clueMessage', clueMessage);

  if (teamTurn === "blueSpymaster") teamTurn = "blueOperative";
  else if (teamTurn === "redSpymaster") teamTurn = "redOperative";

  console.log("it is now the turn of: " + teamTurn)
  console
}


// Red team

function clickRedOperative() {  // red operative
  role = "redOperative";
  var userName = document.getElementById('redName').value;
  socket.emit('redOperativeName', userName);
}

function clickRedSpymaster() {  // red spymaster
  role = "redSpymaster";
  var userName = document.getElementById('redName').value;
  socket.emit('redSpymasterName', userName);
}

// Blue team

function clickBlueOperative() {  // red operative
  role = "blueOperative";
  var userName = document.getElementById('blueName').value;
  socket.emit('blueOperativeName', userName);
}

function clickBlueSpymaster() {  // red spymaster
  role = "blueSpymaster";
  var userName = document.getElementById('blueName').value;
  socket.emit('blueSpymasterName', userName);
}

function setButtonColours() {
  if (role == 1) {
    //document.getElementById("button7").style.background = "#A8201A";
    console.log("you're a spymaster");
  }
}

setCardColours();

var redOperatives = new Set();
var redSpymasters = new Set();
var blueOperatives = new Set();
var blueSpymasters = new Set();

// var canvas = document.getElementById('canvas');
// canvas.width = 1080;
// canvas.height = 650;
//var context = canvas.getContext('2d');


var guessedCards = [];

socket.on('redOperatives', function(operatives) {
  redOperatives = operatives;
  document.getElementById("redOperativeName").textContent = redOperatives;
});

socket.on('redSpymasters', function(spymasters) {
  redSpymasters = spymasters;
  document.getElementById("redSpymasterName").textContent = redSpymasters;
});

socket.on('blueOperatives', function(operatives) {
  blueOperatives = operatives;
  document.getElementById("blueOperativeName").textContent = blueOperatives;
});

socket.on('blueSpymasters', function(spymasters) {
  blueSpymasters = spymasters;
  document.getElementById("blueSpymasterName").textContent = blueSpymasters;
});

socket.on('guessedCards', function(data) {
  guessedCards = data;
  colourGuessedCards();
});

socket.on('clueMessage', function(data) {
  clueMessage = data;
  document.getElementById("turnBanner").textContent = clueMessage;
});

if (redSpymasters.size > 0) {
  document.getElementById("redSpymasterName").textContent = redSpymasters;
}
if (redOperatives.size > 0) {
  document.getElementById("redOperativeName").textContent = redOperatives;
}

if (blueSpymasters.size > 0) {
  document.getElementById("blueSpymasterName").textContent = blueSpymasters;
}
if (blueOperatives.size > 0) {
  document.getElementById("blueOperativeName").textContent = blueOperatives;
}



for (i = 0; i < 25; i++) {
  guessedCards[i] = false;
}

socket.on('state', function(players) {
  socket.on('words', function(words) {
    addWords(words)
  });

  socket.on('cards', function(cards) {
    setCardColours(cards);
  });


  
});


function getCardColour(type) {
  if (type == 0) return "#A8201A";  // red
  if (type == 1) return "#357DED";  // blue
  if (type == 2) return "#555";  // neutral
  if (type == 3) return "#23231A";  // black
}

function setCardColours(cards) {
  if (cards != null && role.includes("Spymaster")) {
    for (i = 0; i < 24; i++) {
      buttonElements[i].style.background = getCardColour(cards[i]);
    }
  }
}


function addWords(words) {
  for (i = 0; i < 25; i++) {
    buttonElements[i].textContent = words[i];
  }
}

var cards;
var redScore = 8;
var blueScore = 9;



socket.on('cards', function(cardColours) {
    cards = cardColours;
});

socket.on('redScore', function(score) {
    redScore = score;
    document.getElementById("redScore").textContent = redScore;
});

socket.on('blueScore', function(score) {
    blueScore = score;
    document.getElementById("blueScore").textContent = blueScore;
});

socket.on('guessedCards', function(data) {
  guessedCards = data;
  colourGuessedCards(guessedCards);
});

function colourGuessedCards() {
  for (i = 0; i < 25; i++) {
    if (guessedCards[i] == true) {
      buttonElements[i].style.background = getCardColour(cards[i]);
    }
  }
}

function handleCardClick(cardNumber) {
  if (cards[cardNumber] == 0) {
    if (teamTurn === "blueOperative") teamTurn = "redSpymaster";
    redScore--;
  }
  if (cards[cardNumber] == 1) {
    if (teamTurn === "redOperative") teamTurn = "blueSpymaster";
    blueScore--;
  }
  if (cards[cardNumber] == 2) {
    if (teamTurn === "blueOperative") teamTurn = "redSpymaster";
    if (teamTurn === "redOperative") teamTurn = "blueSpymaster";
  }
  if (cards[cardNumber] == 3) {
      console.log("GAME OVER, YOU CHOSE THE BLACK CARD!");
      document.getElementById("resultBanner").textContent = "GAME OVER, YOU CHOSE THE BLACK CARD!";
  }

  socket.emit('redScore', redScore);
  socket.emit('blueScore', blueScore);

  // game over
  if (redScore == 0) {
      console.log("GAME OVER, RED WINS!");
      document.getElementById("resultBanner").textContent = "GAME OVER, RED WINS!";
  }
  else if (blueScore == 0) {
      console.log("GAME OVER, BLUE WINS!");
      document.getElementById("resultBanner").textContent = "GAME OVER, BLUE WINS!";
  }
}



function revealCard(guessedCard) {
  guessedCards.push(guessedCard);
}

function clickButton(cardNumber) {
  console.log(role + " clicked button " + cardNumber + " on turn " + teamTurn)
  if (role !== teamTurn) return;
  if (guessedCards[cardNumber]) return;
  
  guessedCards[cardNumber] = true;
  handleCardClick(cardNumber);
  buttonElements[cardNumber].style.background = getCardColour(cards[cardNumber]);
  socket.emit('newGuessedCards', guessedCards);
}