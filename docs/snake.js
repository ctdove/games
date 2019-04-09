var scl = 10;

function Snake() {
	this.x = 10;
	this.y = 10;
	this.xspeed = 0;
	this.yspeed = 0;

	this.dir = function (x, y) {
		this.xspeed = x * scl;
		this.yspeed = y * scl;
	}

	this.move = function () {
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;
	}

	this.update = function () {
		this.move();
		fill(225);
		rect(this.x, this.y, 10, 10);
		this.eat();
	}

	this.die = function () {
		if (this.x === width || this.x === -10) {
			return true;
		} else if (this.y === height || this.y === -10) {
			return true;
		}
	}

	this.reset = function () {
		this.x = 10;
		this.y = 10;
		this.dir(0, 0);
	}

	this.tail = [this.x, this.y];
	this.size = this.tail.length / 2;

	this.eat = function () {
		d = dist(this.x, this.y, a.x, a.y);
		if (d < 1) {
			a.repos();
			this.size ++;
		}
	}

}

function Apple() {
	this.x = Math.ceil(Math.random() * (width - scl)/ scl) * scl;
	this.y = Math.ceil(Math.random() * (height - scl)/ scl) * scl;

	this.update = function () {
		rect(this.x, this.y, scl, scl);
	}

	this.repos = function () {
		this.x = Math.ceil(Math.random() * width / scl) * scl;
		this.y = Math.ceil(Math.random() * height / scl) * scl;
	}

}