/*Globals declarations*/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

/*UNUSED*/
//var touch = new Touch(320, 250, 15, 15);

var score = 0;
var map = new Map();
var died = false;

var Direction = {
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4,
	DEFAULT: 0
};

var pacman = new Pacman();
var ghosts = new Ghost();
var astar = new AStar();

var ghostRed = new GhostFollower(420, 345, "#F00", 5, 0, 0, 0);
var ghostOrange = new GhostRandom(420, 345, "#F90", 5);
var ghostGreen = new GhostFollower(420, 345, "#0F0", 2.5);
var ghostPink = new GhostRandom(420, 345, "#F99", 5);

var size = 50;
var storagedHighScore = localStorage.getItem("HighScore");

var SkorTinggi = Math.max("HighScore", score);

function draw() {
	map.draw();
	pacman.draw();
	map.drawPills();
	ghostRed.draw();
	ghostOrange.draw();
	ghostGreen.draw();
	ghostPink.draw();
	if (pause) {
		ctx.font = "bold 22px sans-serif";
		ctx.fillStyle = "#FFF";
		ctx.fillText("Press N to start", 350, 530);
	}
	//touch.draw();
	document.getElementById("HighScore").innerHTML = storagedHighScore;
}

function limit(direction, horizontal, vertical) {
	var value_y = 0;
	var value_x = 0;
	switch (direction) {
		case Direction.UP:
			value_y = -16;
			value_x = 0;
			break;
		case Direction.DOWN:
			value_y = 15;
			value_x = 0;
			break;
		case Direction.RIGHT:
			value_y = 0;
			value_x = 15;
			break;
		case Direction.LEFT:
			value_y = 0;
			value_x = -16;
			break;
	}
	var cells = map.arrayMap[Math.trunc((vertical + value_y) / 30)][Math.trunc((horizontal + value_x) / 30)];
	if ((cells >= 1 && cells <= 3) && thisCenter(direction, horizontal, vertical)) {
		return true;
	} else {
		return false;
	}

}

function thisCenter(direction, horizontal, vertical) {
	if (direction === Direction.UP || direction === Direction.DOWN) {
		if (Math.trunc((horizontal) / 30) * 30 + 15 === horizontal) {
			return true;
		}
	} else if (direction === Direction.RIGHT || direction === Direction.LEFT) {
		if (Math.trunc((vertical) / 30) * 30 + 15 === vertical) {
			return true;
		}
	}
	return false;
}

//fungsi yg ditambah
function Tile(x, y, type) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.x = x;
    this.y = y;
    this.neighbours = [];
    this.parent = null;
    this.type = type;
}
//end of fungsi yg ditambah

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "canvas") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }

  return {
    x: xPos,
    y: yPos
  };
}

function ChasePacman(horizontal, vertical) {
	var directions = ["", ""];
	var travel_x = horizontal - pacman.x;
	var travel_y = vertical - pacman.y;
	if (Math.abs(travel_x) >= Math.abs(travel_y)) {
		if (horizontal <= pacman.x) {
			directions[0] = Direction.RIGHT;
			if (limit(Direction.RIGHT, horizontal, vertical)) {
				directions[1] = Direction.RIGHT;
			} else {
				if (vertical >= pacman.y && limit(Direction.UP, horizontal, vertical)) {
					directions[1] = Direction.UP;
				} else if (limit(Direction.DOWN, horizontal, vertical)) {
					directions[1] = Direction.DOWN;
				} else {
					directions[1] = Direction.LEFT;
				}
			}
		} else {
			directions[0] = Direction.LEFT;
			if (limit(Direction.LEFT, horizontal, vertical)) {
				directions[1] = Direction.LEFT;
			} else {
				if (vertical >= pacman.y && limit(Direction.UP, horizontal, vertical)) {
					directions[1] = Direction.UP;
				} else if (limit(Direction.DOWN, horizontal, vertical)) {
					directions[1] = Direction.DOWN;
				} else {
					directions[1] = Direction.LEFT;
				}
			}

		}
	} else {
		if (vertical >= pacman.y) {
			directions[0] = Direction.UP;
			if (limit(Direction.UP, horizontal, vertical)) {
				directions[1] = Direction.UP;
			} else {
				if (horizontal <= pacman.x && limit(Direction.RIGHT, horizontal, vertical)) {
					directions[1] = Direction.RIGHT;
				} else {
					directions[1] = Direction.LEFT;
				}
			}
		} else {
			directions[0] = Direction.DOWN;
			if (limit(Direction.DOWN, horizontal, vertical)) {
				directions[1] = Direction.DOWN;
			} else {
				if (horizontal <= pacman.x && limit(Direction.RIGHT, horizontal, vertical)) {
					directions[1] = Direction.RIGHT;
				} else {
					directions[1] = Direction.LEFT;
				}
			}
		}
	}
	//alert("kena deh");
	//console.log(ghostRed.x + " , " + pacman.y);
	 if (ghostRed.x == pacman.x && ghostRed.y == pacman.y) {
		location.reload();
		died = true;
		//console.log(died);
	} else if (ghostOrange.x == pacman.x && ghostOrange.y == pacman.y){
		location.reload();
		died = true;
		//console.log(died);
	} else if (ghostGreen.x == pacman.x && ghostGreen.y == pacman.y){
		location.reload();
		died = true;
		//console.log(died);
	} else if (ghostPink.x == pacman.x && ghostPink.y == pacman.y){
		location.reload();
		died = true;
		//console.log(died);
	} 
	
	//var myElement = document.querySelector("#canvas"); 
	//var position = getPosition(myElement);
//console.log("The image is located at: " + position.x + ", " + position.y);

	return directions;
}

function checkDie(){
	if (died == true){
		alert("you lose");
	}
	if (storagedHighScore  || score > parseInt(storagedHighScore)) {
		localStorage.setItem("HighScore", score);
	}
}

function randomNumber() {
	var max = 5;
	var min = 1;
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomDir(horizontal, vertical) {
	var direction;
	do {
		direction = randomNumber();
	} while (!limit(direction, horizontal, vertical));
	return direction;
}

function newDirection(direction, horizontal, vertical) {
	var reverseDir;
	switch (direction) {
		case Direction.UP:
			reverseDir = Direction.DOWN;
			break;
		case Direction.DOWN:
			reverseDir = Direction.UP;
			break;
		case Direction.RIGHT:
			reverseDir = Direction.LEFT;
			break;
		case Direction.LEFT:
			reverseDir = Direction.RIGHT;
			break;
		default:
			reverseDir = Direction.DEFAULT;
			break;
	}
	do {
		direction = randomDir(horizontal, vertical);
	} while (direction === reverseDir);
	return direction;
}

function GhostsMove() {
	ghostRed.move();
	ghostOrange.move();
	ghostGreen.move();
	ghostPink.move();
}

var keyPress;
var pause = true;

function interaction(e) {
	var KEY_N = 78;
	keyPress = e.keyCode;
	if (keyPress === KEY_N) {
		pause = !pause;
		//Pacman.move();
	}
	return true;
}


function action() {
	draw();
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_DOWN = 40;
	
	document.onkeydown = interaction;

	if (!pause) {
		switch (keyPress) {
			case KEY_DOWN:
				if (limit(Direction.DOWN, pacman.x, pacman.y)) {
					pacman.vx = 0;
					pacman.vy = 1;
					pacman.direction = Direction.DOWN;
				}
				break;
			case KEY_UP:
				if (limit(Direction.UP, pacman.x, pacman.y)) {
					pacman.vx = 0;
					pacman.vy = -1;
					pacman.direction = Direction.UP;
				}
				break;
			case KEY_RIGHT:
				if (limit(Direction.RIGHT, pacman.x, pacman.y)) {
					pacman.vx = 1;
					pacman.vy = 0;
					pacman.direction = Direction.RIGHT;
				}
				break;
			case KEY_LEFT:
				if (limit(Direction.LEFT, pacman.x, pacman.y)) {
					pacman.vx = -1;
					pacman.vy = 0;
					pacman.direction = Direction.LEFT;
				}
				break;
		}
		if (limit(pacman.direction, pacman.x, pacman.y)) {
			pacman.x += pacman.vx * 5;
			pacman.y += pacman.vy * 5;
			if (pacman.x < 0) {
				pacman.x = canvas.width - 15;
			} else if (pacman.x + 16 > canvas.width) {
				pacman.x = 0;
			}
			if (thisCenter(Direction.UP, pacman.x, pacman.y) && thisCenter(Direction.LEFT, pacman.x, pacman.y)){
				var cellsY = Math.trunc((pacman.y) / 30);
				var cellsX = Math.trunc((pacman.x) / 30);
				//if(map.arrayMap[cellsY][cellsX] !== 1) {
				if(map.arrayMap[cellsY][cellsX] == 2) { //jika makan pills biasa 
					map.arrayMap[cellsY][cellsX] = 1;
					score += 10;
					document.getElementById("score").innerHTML = score;
					console.log("posisi y" + cellsY);
					console.log("posisi x" + cellsX);
				} else if (map.arrayMap[cellsY][cellsX] == 3) { //jika makan pills super
					map.arrayMap[cellsY][cellsX] = 1;
					score += 50;
					document.getElementById("score").innerHTML = score;
					//console.log(cellsY);
				}
			}
			
		} else {
			pacman.direction = Direction.DEFAULT;
		}
		checkDie();
		pacman.move();
		GhostsMove();
		
	}
	window.requestAnimationFrame(action);
}

document.addEventListener("load", action());
//console.log(canvas.height);
