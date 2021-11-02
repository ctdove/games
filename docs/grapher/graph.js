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
  let fps = 60; // frames per second variable

  /** demonstrate lines with a manual gradient
    * @function
    */
  const gradientDemonstration = () => {
    ctx.lineTo(canvas.width,canvas.height);
    ctx.stroke();

    const step = 1;
    for (let i = 0; i < canvas.height-step; i+=step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(canvas.height - i, canvas.width);
      let stroke = Math.floor((2**24-(i)*(2**24/canvas.width))-1).toString(16);
      //let stroke = Math.floor((2**24/(i)-1)).toString(16);
      while (stroke.length < 6) {
        stroke = '0' + stroke;
      }
      console.log(stroke, stroke.length);
      
      ctx.strokeStyle = `#${stroke}`;
      ctx.stroke();
    }
  }
  const simpleGraphingDemonstration = () => {
    clearCanvas();
    ctx.beginPath();
    
    if (this.ball == null) {
      this.ball = {
        x: 1,
        y: 1,
        width: canvas.width/16,
        height: canvas.height/16,
        vx: 1.5*(100/fps),
        vy: 0.9*(100/fps),
      }
    }

    ctx.rect(this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    ctx.stroke();

    if (this.ball.x <= 0 || this.ball.x + this.ball.width >= canvas.width) {
      this.ball.vx *= -1.2;
    }
    if (this.ball.y <= 0 || this.ball.y + this.ball.height >= canvas.height) {
      this.ball.vy *= -1.2;
    }

    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;
  }

  clearCanvas();

  const draw = () => {
    //gradientDemonstration();
    simpleGraphingDemonstration();
    //raf = window.requestAnimationFrame(simpleGraphingDemonstration);
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
