var s;
var a;
function setup() {
  var cvn = createCanvas(600, 600);
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
  //document.getElementById("score").innerHTML = s.size;
  //document.getElementById("tail").innerHTML = s.x + "," + s.y;
  if (s.die() === true) {
    s.reset();
  }
}
// Key presses
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
} 
