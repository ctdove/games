var s;
var a;
function setup() {
  var cvn = createCanvas(300, 300);
  cvn.background(0, 0, 0);
  s = new Snake();
  a = new Apple();
  frameRate(20);
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
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
} 

