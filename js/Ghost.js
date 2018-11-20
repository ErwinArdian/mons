/* global Direction, ctx, canvas */

class Ghost {
	constructor(x, y, color, speed, f, g, h) {
		this.x = x,
		this.y = y;
		this.vx = 10;
		this.vy = 0;
		this.color = color;
		this.direction = Direction.DEFAULT;
		this.CorrectDirection = Direction.DEFAULT;
		this.speed = speed;

		this.f = f;
        this.g = g;
        this.h = h;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.x - 16, this.y - 7);
		ctx.quadraticCurveTo(this.x - 14, this.y - 17, this.x - 4, this.y - 19);
		ctx.lineTo(this.x + 5, this.y - 19);
		ctx.quadraticCurveTo(this.x + 15, this.y - 17, this.x + 17, this.y - 7);
		ctx.lineTo(this.x + 17, this.y + 19);
		ctx.lineTo(this.x + 11, this.y + 13);
		ctx.lineTo(this.x + 5, this.y + 19);
		ctx.lineTo(this.x + 1, this.y + 15);
		ctx.lineTo(this.x, this.y + 15);
		ctx.lineTo(this.x - 4, this.y + 19);
		ctx.lineTo(this.x - 10, this.y + 13);
		ctx.lineTo(this.x - 16, this.y + 19);
		ctx.lineTo(this.x - 16, this.y - 7);
		ctx.fill();
		ctx.fillStyle = "#FFF"; //mata
		ctx.fillRect(this.x - 7, this.y - 8, 4, 9);
		ctx.fillRect(this.x - 8, this.y - 7, 6, 7);
		ctx.fillRect(this.x + 5, this.y - 8, 4, 9);
		ctx.fillRect(this.x + 4, this.y - 7, 6, 7);
		ctx.fillStyle = "#000"; //mata
		ctx.fillRect(this.x - 7, this.y - 4, 2, 3);
		ctx.fillRect(this.x + 5, this.y - 4, 2, 3);
	}

	changeDirection(){
		switch (this.direction) {
			case Direction.UP:
				this.vx = 0;
				this.vy = -1;
				break;
			case Direction.DOWN:
				this.vx = 0;
				this.vy = 1;
				break;
			case Direction.RIGHT:
				this.vx = 1;
				this.vy = 0;
				break;
			case Direction.LEFT:
				this.vx = -1;
				this.vy = 0;
				break;
		}
	}
	
	canEaten(){
		console.log("ghost can be eaten");
		// color = "blue";
	}
};

class GhostFollower extends Ghost {
	move() {
		var dirChanged = false;
		if (!limit(this.direction, this.x, this.y) || limit(this.CorrectDirection, this.x, this.y)) {
			var ArrayDirections = ChasePacman(this.x, this.y);
			this.direction = ArrayDirections[1];
			this.CorrectDirection = ArrayDirections[0];
			dirChanged = true;
		}
		if(dirChanged){
			this.changeDirection();
		}
		this.x += this.vx * this.speed;
		this.y += this.vy * this.speed;
		//console.log("posisi x" + this.x);
	}
};

class GhostRandom extends Ghost {
	move() {
		var dirChanged = false;
		if (this.direction === Direction.LEFT || this.direction === Direction.RIGHT) {
			if (limit(Direction.UP, this.x, this.y) ||
					limit(Direction.DOWN, this.x, this.y)) {
				this.direction = newDirection(this.direction, this.x, this.y);
				dirChanged = true;
			}
		} else if (limit(Direction.LEFT, this.x, this.y) ||
				limit(Direction.RIGHT, this.x, this.y)) {
			this.direction = newDirection(this.direction, this.x, this.y);
			dirChanged = true;
		} else if (!limit(this.direction, this.x, this.y)) {
			this.direction = newDirection(this.direction, this.x, this.y);
			dirChanged = true;
		}
		if (this.x < 0) {
			this.x = canvas.width;
		} else if (this.x > canvas.width) {
			this.x = 0;
		}
		if(dirChanged){
			this.changeDirection();
		}
		this.x += this.vx * 5;
		this.y += this.vy * 5;
	}
};