function setup() {
    var cvn = createCanvas(500,500);
    cvn.background(0,0,0);
    s = new snake();
}

var rct = 0
function draw() {
    rct = rect(10,10,10,10);
    rct.fill(255);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rct.xpos ++;
  } else if (keyCode === RIGHT_ARROW) {
    rct.xpos = rct.xpos - 1;
  }
}
