var socket = io();



socket.on('message', function(data) {
  console.log(data);
});

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
  var userName = document.getElementById('redName').value;
  socket.emit('redOperativeName', userName);
}

function clickRedSpymaster() {  // red spymaster
  var userName = document.getElementById('redName').value;
  socket.emit('redSpymasterName', userName);
}

function printMousePos(e){

  cursorX = e.pageX;
  cursorY= e.pageY;
  console.log( "pageX: " + cursorX +",pageY: " + cursorY );
  console.log(getRowNumber(cursorY))
}

function getRowNumber(y) {
  if (y > 136 && y < 256) return 0; // row 1
  if (y > 266 && y < 386) return 1; // row 2
  if (y > 396 && y < 516) return 2; // row 3
  if (y > 526 && y < 646) return 3; // row 4
  if (y > 656 && y < 776) return 4; // row 5
}

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
  }
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = true;
        break;
      case 87: // W
        movement.up = true;
        break;
      case 68: // D
        movement.right = true;
        break;
      case 83: // S
        movement.down = true;
        break;
    }
  });
  document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = false;
        break;
      case 87: // W
        movement.up = false;
        break;
      case 68: // D
        movement.right = false;
        break;
      case 83: // S
        movement.down = false;
        break;
    }
  });

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);

}, 1000 / 60);

var redOperatives = new Set();
var redSpymasters = new Set();

// var canvas = document.getElementById('canvas');
// canvas.width = 1080;
// canvas.height = 650;
//var context = canvas.getContext('2d');

document.addEventListener('click', printMousePos, true);

socket.on('redOperatives', function(operatives) {
  redOperatives = operatives;
  console.log(redOperatives)
});

socket.on('redSpymasters', function(spymasters) {
  redSpymasters = spymasters;
  console.log(redSpymasters)
  document.getElementById("redSpymasterName").textContent = redSpymasters;
  document.getElementById("redOperativeName").textContent = redOperatives;
});

socket.on('state', function(players) {

  // make card outline
  // context.clearRect(0, 0, 1080, 650);
  // createCards(context);
  // context.fillStyle = "#a8201a"
  // context.fillText("Word", 100,100)
  // context.font = "15px Calisto"
  // context.textAlign = "center";
  // context.fillStyle = 'green';
  // for (var id in players) {
  //   var player = players[id];
  //   context.beginPath();
  //   context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
  //   context.fill();
  // }

  if (redSpymasters.size > 0) {
    document.getElementById("redSpymasterName").textContent = redSpymasters;
  }
  if (redOperatives.size > 0) {
    document.getElementById("redOperativeName").textContent = redOperatives;
  }

  socket.on('words', function(words) {
    addWords(words)
  });

  //document.getElementById("redSpymasterName").textContent = Array.from(redSpymasters).join(', ');

  
});

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


