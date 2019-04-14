var s;
var a;
function setup() {
  var cvn = createCanvas(400, 400);
  cvn.background(0, 0, 0);
  s = new Snake();
  a = new Apple();
  frameRate(scl);
  //s.grow();
}

function draw() {
  background(51);
  a.update();
  s.update();
  // Checks for death and resets
  document.getElementById("score").innerHTML = s.size;
  if (s.die() === true) {
    s.reset();
  }
}
// Key presses
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -spd);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, spd);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(spd, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-spd, 0);
  }
} 
