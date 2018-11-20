/* global ctx, Direction */

class Pacman {
	constructor (x, y, speed, f, g, h){
		this.x = 420;
		this.y = 705;
		this.vx = 0;
		this.vy = 0;
		this.radio = 20;
		this.direction = Direction.DEFAULT;
		//this.speed = speed;
		
		this.f = f;
        this.g = g;
        this.h = h;
	}
	
	draw() {
		ctx.fillStyle = "rgb(255,255,0)";
		ctx.beginPath();
		switch (this.direction) {
			case Direction.UP:
				ctx.arc(this.x, this.y, this.radio, 1.25 * Math.PI, Math.PI * 1.75, true);
				break;
			case Direction.DOWN:
				ctx.arc(this.x, this.y, this.radio, Math.PI / 4, Math.PI / 1.3, true);
				break;
			case Direction.LEFT:
				ctx.arc(this.x, this.y, this.radio, Math.PI / 1.4, 1.25 * Math.PI, true);
				break;
			case Direction.RIGHT:
				ctx.arc(this.x, this.y, this.radio, 1.75 * Math.PI, Math.PI / 4, true);
				break;
			default:
				ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, true);
				break;
		}
		ctx.lineTo(this.x, this.y);
		ctx.fill();
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
	/*
	UP: 1,
	DOWN: 2,
	LEFT: 3,
	RIGHT: 4,
	DEFAULT: 0
	*/
	move() {
		var dirChanged = false;
		if (this.direction === Direction.LEFT || this.direction === Direction.RIGHT) {
			if (limit(Direction.UP, this.x, this.y) ||
					limit(Direction.DOWN, this.x, this.y)) {
				this.direction = newDirection(this.direction, this.x, this.y);
				dirChanged = true;
				//console.log(this.direction);
			}
		} else if (limit(Direction.LEFT, this.x, this.y) ||
				limit(Direction.RIGHT, this.x, this.y)) {
			this.direction = newDirection(this.direction, this.x, this.y);
			dirChanged = true;
			//console.log(this.direction);
		} else if (!limit(this.direction, this.x, this.y)) {
			this.direction = newDirection(this.direction, this.x, this.y);
			dirChanged = true;
			//console.log(this.direction);
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
}