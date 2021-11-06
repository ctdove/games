/** clear any given canvas
 * @function
 * @return {void}
 */
HTMLCanvasElement.prototype.clearCanvas = function() {
  const canvas = this;
  canvas.getContext('2d').clearRect(0, 0, this.width, this.height);
}
/** make a snake game from a canvas
 * @function
 * @param {HTMLCanvasElement} canvas
 * @param {Number} width
 * @param {Number} height
 */
const makeSnakeGame = (canvas, width=512, height=512) => {
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  
  canvas.clearCanvas();

  let raf;
  let fps = 20;

  let numSquaresX = 64;
  let numSquaresY = 64;

  let pixelScaleX = canvas.width/numSquaresX;
  let pixelScaleY = canvas.height/numSquaresY;

  let selfCollisions = true;

  class Snake {
    constructor() {
      this.x = Math.floor(Math.random()*(numSquaresX-2)) + 2;
      this.y = Math.floor(Math.random()*(numSquaresY-2)) + 2;

      this.segments = [[this.x, this.y]];

      this.vx = 0;
      this.vy = 0;

      this.color = `#ff00ff`;

      this.numAddSegments = 0;
    }
    updatePos() {
      // check for wall collisions
      if (
        this.segments[0][0] <= 0 || 
        this.segments[0][0] >= numSquaresX-1) {
        this.reset();
      } else if (
        this.segments[0][1] <= 0 ||
        this.segments[0][1] >= numSquaresY-1) {
        this.reset();
      } 
      this.x += this.vx;
      this.y += this.vy;
      
      // add segments
      this.segments.unshift([this.x, this.y]);
      if (this.numAddSegments !== 0) {
        this.numAddSegments--;
      } else {
        this.segments.pop();
      }

      //check for self collisions
      this.segments.forEach((segment, i) => {
        // i know it's not the most efficient way but it was quick to code in
        this.segments.forEach((targetSegment, j) => {
          if (i !== j) {
            if (segment[0] === targetSegment[0] && 
                segment[1] === targetSegment[1]) {
              this.reset();
            }
          }
        })
      })
    }
    draw() {
      this.segments.forEach((segment, i) => {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(
          segment[0]*pixelScaleX, segment[1]*pixelScaleY,
          pixelScaleX, pixelScaleY
        );
        ctx.fill();
      });
    }
    reset() {
      Object.assign(this, new Snake());
    }
  }

  class Apple {
    constructor() {
      this.x = Math.floor(Math.random()*(numSquaresX-2)) + 2;
      this.y = Math.floor(Math.random()*(numSquaresY-2)) + 2;

      this.color = `#ff0000`;
    }
    draw() {
      ctx.beginPath();
      ctx.rect(
        this.x*pixelScaleX, this.y*pixelScaleY,
        pixelScaleX, pixelScaleY
      );
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    reset() {
      Object.assign(this, new Snake());
    }
  }

  const snake = new Snake();
  const apple = new Apple();

  document.addEventListener('keydown', (e) => {
    const pressedKey = e.key;
    
    if (pressedKey === "ArrowUp") {
      if (snake.segments.length === 1 || snake.vy !== 1) {
        snake.vx = 0;
        snake.vy = -1;
      }
    } else if (pressedKey === "ArrowDown") {
      if (snake.segments.length === 1 || snake.vy !== -1) {
        snake.vx = 0;
        snake.vy = 1;
      }
    } else if (pressedKey === "ArrowLeft") {
      if (snake.segments.length === 1 || snake.vx !== 1) {
        snake.vx = -1;
        snake.vy = 0;
      }
    } else if (pressedKey === "ArrowRight") {
      if (snake.segments.length === 1 || snake.vx !== -1) {
        snake.vx = 1;
        snake.vy = 0;
      }
    } else if (pressedKey === "p") {
      snake.vx = 0;
      snake.vy = 0;
    }
  });

  const draw = () => {
    canvas.clearCanvas();
    snake.draw();
    snake.updatePos();
    if (apple.x === snake.segments[0][0] &&
        apple.y === snake.segments[0][1]) {
    /**if (apple.x === snake.x &&
        apple.y === snake.y) {*/
      snake.numAddSegments++;
      apple.reset();
    }
    apple.draw();

    document.querySelector('#score-counter').textContent =
      `${snake.segments.length-1}`;
  }

  raf = setInterval(draw, 1000/fps);
  /**let addSegs = setInterval(() => {
    snake.numAddSegments++;
  }, 1000);*/
}
