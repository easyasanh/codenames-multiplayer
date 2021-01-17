var socket = io();

var role = 0; // role 0 for operative, role 1 for spymaster

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

// User joining game


// Red team

function clickRedOperative() {  // red operative
  role = 0;
  var userName = document.getElementById('redName').value;
  socket.emit('redOperativeName', userName);
}

function clickRedSpymaster() {  // red spymaster
  role = 1;
  var userName = document.getElementById('redName').value;
  socket.emit('redSpymasterName', userName);
}

// Blue team

function clickBlueOperative() {  // red operative
  role = 0;
  var userName = document.getElementById('blueName').value;
  socket.emit('blueOperativeName', userName);
}

function clickBlueSpymaster() {  // red spymaster
  role = 1;
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
  if (cards != null && role == 1) {
    document.getElementById('button0').style.background = getCardColour(cards[0]);
    document.getElementById('button1').style.background = getCardColour(cards[1]);
    document.getElementById('button2').style.background = getCardColour(cards[2]);
    document.getElementById('button3').style.background = getCardColour(cards[3]);
    document.getElementById('button4').style.background = getCardColour(cards[4]);
    document.getElementById('button5').style.background = getCardColour(cards[5]);
    document.getElementById('button6').style.background = getCardColour(cards[6]);
    document.getElementById('button7').style.background = getCardColour(cards[7]);
    document.getElementById('button8').style.background = getCardColour(cards[8]);
    document.getElementById('button9').style.background = getCardColour(cards[9]);
    document.getElementById('button10').style.background = getCardColour(cards[10]);
    document.getElementById('button11').style.background = getCardColour(cards[11]);
    document.getElementById('button12').style.background = getCardColour(cards[12]);
    document.getElementById('button13').style.background = getCardColour(cards[13]);
    document.getElementById('button14').style.background = getCardColour(cards[14]);
    document.getElementById('button15').style.background = getCardColour(cards[15]);
    document.getElementById('button16').style.background = getCardColour(cards[16]);
    document.getElementById('button17').style.background = getCardColour(cards[17]);
    document.getElementById('button18').style.background = getCardColour(cards[18]);
    document.getElementById('button19').style.background = getCardColour(cards[19]);
    document.getElementById('button20').style.background = getCardColour(cards[20]);
    document.getElementById('button21').style.background = getCardColour(cards[21]);
    document.getElementById('button22').style.background = getCardColour(cards[22]);
    document.getElementById('button23').style.background = getCardColour(cards[23]);
    document.getElementById('button24').style.background = getCardColour(cards[24]);
  }
}


function addWords(words) {
  document.getElementById('button0').textContent = words[0];
  document.getElementById('button1').textContent = words[1];
  document.getElementById('button2').textContent = words[2];
  document.getElementById('button3').textContent = words[3];
  document.getElementById('button4').textContent = words[4];
  document.getElementById('button5').textContent = words[5];
  document.getElementById('button6').textContent = words[6];
  document.getElementById('button7').textContent = words[7];
  document.getElementById('button8').textContent = words[8];
  document.getElementById('button9').textContent = words[9];
  document.getElementById('button10').textContent = words[10];
  document.getElementById('button11').textContent = words[11];
  document.getElementById('button12').textContent = words[12];
  document.getElementById('button13').textContent = words[13];
  document.getElementById('button14').textContent = words[14];
  document.getElementById('button15').textContent = words[15];
  document.getElementById('button16').textContent = words[16];
  document.getElementById('button17').textContent = words[17];
  document.getElementById('button18').textContent = words[18];
  document.getElementById('button19').textContent = words[19];
  document.getElementById('button20').textContent = words[20];
  document.getElementById('button21').textContent = words[21];
  document.getElementById('button22').textContent = words[22];
  document.getElementById('button23').textContent = words[23];
  document.getElementById('button24').textContent = words[24];
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

function handleCardClick(cardNumber) {
    if (cards[cardNumber] == 0) redScore--;
    if (cards[cardNumber] == 1) blueScore--;
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

function clickButton0() {
    console.log("clicked button 0")
    handleCardClick(0);
}

function clickButton1() {
    console.log("clicked button 1")
    handleCardClick(1);
}

function clickButton2() {
    console.log("clicked button 2")
    handleCardClick(2);
}

function clickButton3() {
    console.log("clicked button 3")
    handleCardClick(3);
}

function clickButton4() {
    console.log("clicked button 4")
    handleCardClick(4);
}

function clickButton5() {
    console.log("clicked button 5")
    handleCardClick(5);
}

function clickButton6() {
    console.log("clicked button 6")
    handleCardClick(6);
}

function clickButton7() {
    console.log("clicked button 7")
    handleCardClick(7);
}

function clickButton7() {
    console.log("clicked button 7")
    handleCardClick(7);
}

function clickButton8() {
    console.log("clicked button 8")
    handleCardClick(8);
}

function clickButton9() {
    console.log("clicked button 9")
    handleCardClick(9);
}

function clickButton10() {
    console.log("clicked button 10")
    handleCardClick(10);
}

function clickButton11() {
    console.log("clicked button 11")
    handleCardClick(11);
}

function clickButton12() {
    console.log("clicked button 12")
    handleCardClick(12);
}

function clickButton13() {
    console.log("clicked button 13")
    handleCardClick(13);
}

function clickButton14() {
    console.log("clicked button 14")
    handleCardClick(14);
}

function clickButton15() {
    console.log("clicked button 15")
    handleCardClick(15);
}

function clickButton16() {
    console.log("clicked button 16")
    handleCardClick(16);
}

function clickButton17() {
    console.log("clicked button 17")
    handleCardClick(17);
}

function clickButton18() {
    console.log("clicked button 18")
    handleCardClick(18);
}

function clickButton19() {
    console.log("clicked button 19")
    handleCardClick(19);
}

function clickButton20() {
    console.log("clicked button 20")
    handleCardClick(20);
}

function clickButton21() {
    console.log("clicked button 21")
    handleCardClick(21);
}

function clickButton22() {
    console.log("clicked button 22")
    handleCardClick(22);
}

function clickButton23() {
    console.log("clicked button 23")
    handleCardClick(23);
}

function clickButton24() {
    console.log("clicked button 24")
    handleCardClick(24);
}


