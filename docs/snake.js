var scl = 10
var spd = 1

function Snake () {
  this.total = 1
  this.x = [scl]
  this.y = [scl]
  var segmentx = []
  var segmenty = []
  this.x.speed = 0
  this.y.speed = 0
  this.size = this.x.length
  var selfhit = false

  this.dir = function (x, y) {
    this.x.speed = x * scl
    this.y.speed = y * scl
  }

  this.move = function () {
    if (this.x.length > 1) {
      var i
      for (i = this.x.length - 1; i > 0; i--) {
        this.x[i] = this.x[i - 1]
        this.y[i] = this.y[i - 1]
      }
    }
    this.x[0] += this.x.speed
    this.y[0] += this.y.speed
    segmentx = this.x.slice(1)
	segmenty = this.y.slice(1)
  }

  this.update = function () {
    this.move()
    this.eat()
    fill(255)
    var i
    var j
    for (j = segmentx.length; j >= 0; j--) {
      if (segmentx[j] === this.x[0] && segmenty[j] === this.y[0]) {
        selfhit = true
      }
    }
    for (i = this.x.length - 1; i >= 0; i--) {
      rect(this.x[i], this.y[i], scl, scl)
    }
  }

  this.die = function () {
    if (this.x[0] === width || this.x[0] === -scl) {
      return true
    } else if (this.y[0] === height || this.y[0] === -scl) {
      return true
    } else if (selfhit === true) {
      return true
    }
  }

  this.reset = function () {
    this.x = [scl]
    this.y = [scl]
    segmentx = []
    segmenty = []
    selfhit = false
    this.dir(0, 0)
    this.size = this.x.length
    this.total = 1
    a.repos()
  }

  this.eat = function () {
    d = dist(this.x[0], this.y[0], a.x, a.y)
    if (d < 1) {
      a.repos()
      this.x.push(this.x[this.x.length - 1] + this.x.speed)
      this.y.push(this.y[this.y.length - 1] + this.y.speed)
      this.size++
    }
  }
}

function Apple () {
  this.x = Math.ceil(Math.random() * (width - scl) / scl) * scl
  this.y = Math.ceil(Math.random() * (height - scl) / scl) * scl

  this.update = function () {
    fill(200, 0, 200)
    rect(this.x, this.y, scl, scl)
  }

  this.repos = function () {
    this.x = Math.ceil(Math.random() * (width - scl) / scl) * scl
    this.y = Math.ceil(Math.random() * (height - scl) / scl) * scl
  }
}
