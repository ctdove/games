var s
var a
var lpress = false
var rpress = false
var upress = false
var dpress = false
function setup () {
  var cvn = createCanvas(400, 400)
  cvn.background(0, 0, 0)
  s = new Snake()
  a = new Apple()
  frameRate(scl)
  //s.grow();
}

function draw () {
  background(51)
  a.update()
  s.update()
  // Checks for death and resets
  document.getElementById('score').innerHTML = s.size
  if (s.die() === true) {
    s.reset()
    lpress = false
    rpress = false
    upress = false
    dpress = false
  }
}
// Key presses
function keyPressed () {
  if (keyCode === UP_ARROW && dpress === false) {
    s.dir(0, -spd)
    upress = true
    dpress = false
    lpress = false
    rpress = false
  } else if (keyCode === DOWN_ARROW && upress === false) {
    s.dir(0, spd)
    upress = false
    dpress = true
    lpress = false
    rpress = false
  } else if (keyCode === RIGHT_ARROW && lpress === false) {
    s.dir(spd, 0)
    upress = false
    dpress = false
    lpress = false
    rpress = true
  } else if (keyCode === LEFT_ARROW && rpress === false) {
    s.dir(-spd, 0)
    upress = false
    dpress = false
    lpress = true
    rpress = false
  }
}
