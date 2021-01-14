var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

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

var canvas = document.getElementById('canvas');
canvas.width = 1080;
canvas.height = 650;
var context = canvas.getContext('2d');



socket.on('state', function(players) {

  // make card outline
  context.clearRect(0, 0, 1080, 650);
  createCards(context);
  context.fillStyle = "#a8201a"
  context.fillText("Word", 100,100)
  context.font = "15px Calisto"
  context.textAlign = "center";
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }

  //names
  
  //document.getElementById("redSpymasterName").textContent = Array.from(redSpymasters).join(', ');
  socket.on('redOperatives', function(operatives) {
    redOperatives = operatives;
    console.log(redOperatives)
    document.getElementById("redSpymasterName").textContent = redSpymasters;
    document.getElementById("redOperativeName").textContent = redOperatives;
  });

  socket.on('redSpymasters', function(spymasters) {
    redSpymasters = spymasters;
    console.log(redSpymasters)
    document.getElementById("redSpymasterName").textContent = redSpymasters;
    document.getElementById("redOperativeName").textContent = redOperatives;
  });
  
  

});
