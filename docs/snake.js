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
		//this.tail[0] += this.xspeed;
		//this.tail[1] += this.yspeed;
		var i;
		for (i = 0; i < this.tail.length; i++) {
			this.tail[i * 2] += this.xspeed;
			this.tail[i * 2 + 1]  += this.yspeed;
		}
	}

	this.update = function () {
		this.move();
		fill(225);
		//rect(this.x, this.y, 10, 10);
		this.eat();
		var i;
		for (i = 0; i < this.tail.length; i++) {
			rect(this.tail[i * 2], this.tail[i * 2 + 1], scl, scl);
		}
	}

	this.die = function () {
		if (this.tail[0] === width || this.tail[0] === -10) {
			return true;
		} else if (this.tail[1] === height || this.tail[1] === -10) {
			return true;
		}
	}

	this.reset = function () {
		this.tail = [this.x, this.y];
		this.dir(0, 0);
		this.size = 1;
		a.repos();
	}

	this.tail = [this.x, this.y];
	this.size = this.tail.length / 2;

	this.eat = function () {
		d = dist(this.tail[0], this.tail[1], a.x, a.y);
		if (d < 1) {
			a.repos();
			this.size ++;
			this.tail.push(this.tail[0] - 10, this.tail[1]);
		}
	}

}

function Apple() {
	this.x = Math.ceil(Math.random() * (width - scl) / scl) * scl;
	this.y = Math.ceil(Math.random() * (height - scl) / scl) * scl;

	this.update = function () {
		rect(this.x, this.y, scl, scl);
	}

	this.repos = function () {
		this.x = Math.ceil(Math.random() * (width - scl) / scl) * scl;
		this.y = Math.ceil(Math.random() * (height - scl) / scl) * scl;
	}

}