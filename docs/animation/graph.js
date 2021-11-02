/** make a graphing demonstration canvas
  * @function
  * @param {HTMLCanvasElement} canvas
  * @param {Number} width
  * @param {Number} height
  */

const makeSimpleAnimationDemonstration = (canvas, width=512, height=512) => {
  canvas.innerHTML = '';
  
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.moveTo(0,0);

  /** clear the whole canvas
   * @function
   */
  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  clearCanvas();

  let raf; // request animation frame
  let fps = 30; // frames per second variable
  let frameScaleX = canvas.width/fps;
  let frameScaleY = canvas.height/fps;
  /* Ball class
   * @class
   */
  function Ball(vx=1, vy=1.5) {
    //constructor(vx=1, vy=1.5) {
    this.x = 0;
    this.y = 0;
    this.radius = 10;

    this.vx = vx;
    this.vy = vy;
    //}
    //get magnitude() {
    this.magnitude = function () {
      return Math.sqrt(this.vx**2+this.vy**2);
    }
    //get unitVector() {
    this.unitVector = function () {
      return [ this.vx/this.magnitude(), this.vy/this.magnitude() ];
    }
    /**
     * @function
     * @param {Ball} targetBall
     */
    this.calcDotProduct = function (targetBall) {
      //targetBall = targetBall || new Ball();
      return this.vx*targetBall.vx + this.vy*targetBall.vy;
    }
    /**
     * @function
     * @param {Ball} targetBall
     */
    //calcCollisionVector(targetBall) {
    this.calcCollisionVector = function (targetBall) {
      const dotProduct = this.calcDotProduct(targetBall);
      return [ 
        this.unitVector()[0]*dotProduct - this.vx,
        this.unitVector()[1]*dotProduct - this.vy
      ];
    }
    //drawVector() {
    this.drawVector = function () {
      // draw line
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.vx*frameScaleX, this.vy*frameScaleY);
      ctx.stroke();
      // draw arrow
    }
    this.drawBall = function () {
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2*Math.PI);
      ctx.stroke();
    }
  }

  /* ball collision test
   * @function
   * @param {Number} numBalls
   */
  const ballCollisionTest = (numBalls=5) => {
    clearCanvas();
    
    if (typeof this.balls === 'undefined') {
      this.balls = [];
      for (let i = 0; i < numBalls; i++) {
        const ball = new Ball();
        /**console.log(Object.getOwnPropertyNames(ball).filter((e) => {
          return typeof ball[e] === 'function';
        }));*/
        
        const vxmin = 0, vxmax = 1;
        const vymin = 0, vymax = 1;
        ball.vx = Math.random() * vxmax + vxmin;
        ball.vy = Math.random() * vymax + vymin;

        const xmin = ball.radius, xmax = canvas.width-ball.radius;
        const ymin = ball.radius, ymax = canvas.height-ball.radius;
        ball.x = Math.random() * xmax + xmin;
        ball.y = Math.random() * ymax + ymin;
        
        ball.drawBall();
        
        this.balls.push(ball);
      }
      this.balls.forEach((ball, i) => {
        let otherBalls = [...Array(this.balls.length).keys()];
        otherBalls.splice(i, 1);
        /**otherBalls.forEach((ballNum, j) => {
          //console.log(tmpBalls[ballNum].vx, tmpBalls[ballNum].vy);
          const tmpBall = tmpBalls[ballNum];
          //console.log(`Vector ${i} : ${ball.vx}, ${ball.vy}`);
          //console.log(`Vector ${j} : ${tmpBall.vx}, ${tmpBall.vy}`);
          //console.log(...ball.calcCollisionVector(tmpBalls[ballNum]));
        });*/
        ball.drawVector();
        ctx.font = `${20}px serif`;
        ctx.fillText(`${i}`, ball.vx*frameScaleX, ball.vy*frameScaleY);
      });
    }

    console.log(this.balls);
    this.balls.forEach((ball, i) => {
      //console.log(i);
      ball.drawBall();
      //this.balls[i].drawBall();

      ball.x += ball.vx*frameScaleX;
      ball.y += ball.vy*frameScaleY;

      // check for wall collisions
      if (ball.x <= ball.radius || ball.x >= canvas.width-ball.radius) {
        ball.vx *= -1;
      }
      if (ball.y <= ball.radius || ball.y >= canvas.height-ball.radius) {
        ball.vy *= -1;
      }
      // check for interball collisions
      let otherBalls = [ ...this.balls ];
      otherBalls.splice(i, 1); // take out current ball
      /**otherBalls.forEach((otherBall, j) => { 
        if (otherBall.x-otherBall.radius <= ball.x <= otherBall.x+otherBall.radius || 
            otherBall.y-otherBall.radius <= ball.y <= otherBall.y+otherBall.radius) {
          let newBall = { ...ball };
          newBall.vx = ball.calcCollisionVector(otherBall)[0];
          newBall.vy = ball.calcCollisionVector(otherBall)[1];
          this.balls[i] = { ...newBall };
        }
      });*/
    });
  }

  clearCanvas();

  const draw = () => {
    //simpleGraphingDemonstration();
    ballCollisionTest();
  }
  
  canvas.addEventListener('mouseover', () => {
    //raf = window.requestAnimationFrame(draw);
    raf = setInterval(draw, 1000/fps);
  });
  canvas.addEventListener('mouseout', () => {
    //window.cancelAnimationFrame(raf);
    clearInterval(raf);
  });
  draw();
}
