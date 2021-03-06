// TODO:
// team name joining
// more faces
// count number of guesses
// highlight
// log

var socket = io();

var role = "Spectator";
var teamTurn = "Blue Spymaster"; // blueSpymaster -> blueOperative -> redSpymaster -> redOperative
var clue = "";
var gameOver = false;

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

var endTurnButton = document.getElementById('endTurnButton')

var buttonElements = [];
buttonElements.push(button0, button1, button2, button3, button4, button5, button6, button7, button8, button9,
  button10, button11, button12, button13, button14, button15, button16, button17, button18, button19,
  button20, button21, button22, button23, button24);


function showRules() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function endTurn() {
  if (teamTurn !== role) return
  endTurnButton.style.visibility = "hidden";
  if (teamTurn === "Blue Operative") teamTurn = "Red Spymaster";
  else if (teamTurn === "Red Operative") teamTurn = "Blue Spymaster";
  socket.emit('teamTurn', teamTurn);
  var clueMessage = teamTurn + "'s turn";
  socket.emit('clueMessage', clueMessage);
}


function setCardBackgrounds() {
  for (i = 0; i < 25; i++) {
    buttonElements[i].style.backgroundImage = imageNames[i];
    buttonElements[i].style.backgroundSize = "120px 120px";
    buttonElements[i].style.backgroundRepeat = "no-repeat";
    buttonElements[i].style.backgroundPosition = "center";
  }
}

function createCards(context) {
  for (i = 50; i < 1050; i += 200) {
    for (j = 0; j < 650; j += 130) {
      context.fillStyle = "#C2C1C2";
      context.fillRect(i, j, 190, 120);
    }
  }
}

function giveClue() {
  console.log(role + " " + teamTurn);
  clueBar.style.visibility = "hidden";
  if (role === teamTurn) {
    var wordField = document.getElementById('clueWord');
    var numberField = document.getElementById('clueNumber');
    var word = wordField.value;
    var number = numberField.value;


    if (teamTurn === "Blue Spymaster") teamTurn = "Blue Operative";
    else if (teamTurn === "Red Spymaster") teamTurn = "Red Operative";

    var clueMessage = teamTurn + "'s turn to guess. Clue: " + word + ", " + number;
    console.log(role + " gave clue: " + word + ', ' + number);

    socket.emit('clueMessage', clueMessage);

    socket.emit('teamTurn', teamTurn);
  }
}

var clueBar = document.getElementById("clueBar");
// Red team

function clickRedOperative() {  // red operative
  setCardBackgrounds();
  role = "Red Operative";
  var userName = document.getElementById('redUserName').value;
  //clueBar.style.visibility = "hidden";
  clearCardColours();
  socket.emit('redOperativeName', userName);
}

function clickRedSpymaster() {  // red spymaster
  setCardBackgrounds();
  role = "Red Spymaster";
  var userName = document.getElementById('redUserName').value;
  //clueBar.style.visibility = "visible";
  socket.emit('redSpymasterName', userName);

  setCardBackgrounds();
}

// Blue team

function clickBlueOperative() {  // red operative
  setCardBackgrounds();
  role = "Blue Operative";
  var userName = document.getElementById('blueUserName').value;
  //clueBar.style.visibility = "hidden";
  clearCardColours();
  socket.emit('blueOperativeName', userName);
}

function clickBlueSpymaster() {  // red spymaster
  setCardBackgrounds();
  role = "Blue Spymaster";
  var userName = document.getElementById('blueUserName').value;
  //clueBar.style.visibility = "visible";
  socket.emit('blueSpymasterName', userName);

  setCardBackgrounds();
}

function openForm() {
  document.getElementById("formContainer").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var redOperatives = new Set();
var redSpymasters = new Set();
var blueOperatives = new Set();
var blueSpymasters = new Set();

// var canvas = document.getElementById('canvas');
// canvas.width = 1080;
// canvas.height = 650;
//var context = canvas.getContext('2d');

var guessedCards = new Array(25);
var imageNames;


for (i = 0; i < 25; i++) {
  guessedCards[i] = false;
}

socket.on('imageNames', function (data) {
  imageNames = data;
  setCardBackgrounds();
});

socket.on('redOperatives', function (operatives) {
  redOperatives = operatives;
  document.getElementById("redOperativeName").textContent = redOperatives;
});

socket.on('redSpymasters', function (spymasters) {
  redSpymasters = spymasters;
  document.getElementById("redSpymasterName").textContent = redSpymasters;
});

socket.on('blueOperatives', function (operatives) {
  blueOperatives = operatives;
  document.getElementById("blueOperativeName").textContent = blueOperatives;
});

socket.on('blueSpymasters', function (spymasters) {
  blueSpymasters = spymasters;
  document.getElementById("blueSpymasterName").textContent = blueSpymasters;
});

socket.on('guessedCards', function (data) {
  guessedCards = data;
  colourGuessedCards();
});

socket.on('clueMessage', function (data) {
  clueMessage = data;
  document.getElementById("turnBanner").textContent = clueMessage;
});

socket.on('gameOver', function (data) {
  gameOver = data;
  if (gameOver) setCardColours(cards);
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




socket.on('state', function (players) {
  socket.on('words', function (words) {
    //addWords(words)
  });

  socket.on('cards', function (cards) {
    if (cards != null && role.includes("Spymaster")) {
      setCardColours(cards);
    }
  });



});


function getCardColour(type) {
  if (type == 0) return "#A8201A";  // red
  if (type == 1) return "#357DED";  // blue
  if (type == 2) return "#888";  // neutral
  if (type == 3) return "#23231A";  // black
}

function setCardOutlines(cards) {
  for (i = 0; i < 25; i++) {
    buttonElements[i].style.border = "5px solid " + getCardColour(cards[i]);
  }
}

function setCardColours(cards) {
  for (i = 0; i < 25; i++) {
    buttonElements[i].style.background = getCardColour(cards[i]);
  }
  setCardBackgrounds();
}

function clearCardColours() {
  for (i = 0; i < 25; i++) {
    buttonElements[i].style.background = "white";
  }
}

function clearCardOutlines() {
  for (i = 0; i < 25; i++) {
    buttonElements[i].style.border = "5px solid #C1C1C2";
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



socket.on('cards', function (cardColours) {
  cards = cardColours;
});

socket.on('redScore', function (score) {
  redScore = score;
  document.getElementById("redScore").textContent = redScore;
});

socket.on('blueScore', function (score) {
  blueScore = score;
  document.getElementById("blueScore").textContent = blueScore;
});

socket.on('teamTurn', function (data) {
  teamTurn = data;
  if (role.includes('Spymaster')) {
    if (teamTurn == role) clueBar.style.visibility = "visible";
    else clueBar.style.visibility = "hidden";
  }
  else {
    if (teamTurn == role) endTurnButton.style.visibility = "visible";
    else endTurnButton.style.visibility = "hidden";
  }

  

});



function colourGuessedCards() {
  for (i = 0; i < 25; i++) {
    if (guessedCards[i] == true) {
      buttonElements[i].style.opacity = "1"
      buttonElements[i].style.background = getCardColour(cards[i]);
      buttonElements[i].style.backgroundImage = imageNames[i];
      buttonElements[i].style.backgroundSize = "120px 120px";
      buttonElements[i].style.backgroundRepeat = "no-repeat";
      buttonElements[i].style.backgroundPosition = "center";
      if (role.includes("Spymaster")) buttonElements[i].style.opacity = "0.4";
    }
    if (role.includes("Spymaster")) buttonElements[i].style.color = "white";
  }
}

function handleCardClick(cardNumber) {
  if (cards[cardNumber] == 0) {
    if (teamTurn === "Blue Operative") {
      console.log("blue chose a red card!")
      teamTurn = "Red Spymaster";
      var clueMessage = teamTurn + "'s turn";
      socket.emit('clueMessage', clueMessage);
    }
    redScore--;
  }
  if (cards[cardNumber] == 1) {
    if (teamTurn === "Red Operative") {
      console.log("red chose a blue card!")
      teamTurn = "Blue Spymaster";
      var clueMessage = teamTurn + "'s turn";
      socket.emit('clueMessage', clueMessage);
    }
    blueScore--;
  }
  if (cards[cardNumber] == 2) {
    if (teamTurn === "Blue Operative") teamTurn = "Red Spymaster";
    if (teamTurn === "Red Operative") teamTurn = "Blue Spymaster";
    console.log(teamTurn + " chose a grey card!")
    var clueMessage = teamTurn + "'s turn";
    socket.emit('clueMessage', clueMessage);
  }
  if (cards[cardNumber] == 3) {
    console.log("GAME OVER, YOU CHOSE THE BLACK CARD!");
    var clueMessage = "GAME OVER! " + teamTurn + " CHOSE THE BLACK CARD!";
    socket.emit('clueMessage', clueMessage);
    gameOver = true;
  }

  socket.emit('redScore', redScore);
  socket.emit('blueScore', blueScore);


  socket.emit('teamTurn', teamTurn);



  // game over
  if (redScore == 0) {
    console.log("GAME OVER, RED WINS!");
    var clueMessage = "GAME OVER, RED WINS!";
    socket.emit('clueMessage', clueMessage);
    gameOver = true;
    socket.emit('gameOver', gameOver);
  }
  else if (blueScore == 0) {
    console.log("GAME OVER, BLUE WINS!");
    var clueMessage = "GAME OVER, BLUE WINS!";
    socket.emit('clueMessage', clueMessage);
    gameOver = true;
  }

  socket.emit('gameOver', gameOver);
}



function revealCard(guessedCard) {
  guessedCards.push(guessedCard);
}

function clickButton(cardNumber) {
  console.log(role + " clicked button " + cardNumber + " on turn " + teamTurn)
  if (role !== teamTurn) return;
  if (guessedCards[cardNumber]) return;
  if (gameOver) return;

  guessedCards[cardNumber] = true;
  socket.emit('newGuessedCards', guessedCards);
  handleCardClick(cardNumber);
  buttonElements[cardNumber].style.background = getCardColour(cards[cardNumber]);
  setCardBackgrounds();
}