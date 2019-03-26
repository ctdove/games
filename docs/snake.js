function Snake () {
	this.x = 30;
	this.y = 30;
	this.xspeed = 1;
	this.yspeed = 0;

	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.move = function () {
		this.x = this.x + this.xspeed;
		this.y = this.y + this.yspeed;
	}

	this.display = function () {
		fill(225);
		rect(this.x,this.y,10,10);
	}
}
