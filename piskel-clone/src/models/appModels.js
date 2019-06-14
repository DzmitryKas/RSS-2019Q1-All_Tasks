/* eslint-disable class-methods-use-this */
export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static cloneCanvas() {
    // create a new canvas
    const newCanvas = document.querySelector('.canvas-mini');
    const newContext = newCanvas.getContext('2d');

    const oldCanvas = document.querySelector('#canvas-basic');

    // set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    // apply the old canvas to the new one
    newContext.drawImage(oldCanvas, 0, 0);

    // return the new canvas
    // return newCanvas;
  }

  drawPen(lineWidth, myColor) {
    const canvasBasic = document.getElementById('canvas-basic');
    const ctx = canvasBasic.getContext('2d');

    canvasBasic.onmousedown = function onmousedown(event) {
      ctx.beginPath();
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.strokeStyle = myColor;
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.moveTo(x, y);
      canvasBasic.onmousemove = function onmousemove(e) {
        const xd = e.offsetX;
        const yd = e.offsetY;
        ctx.lineTo(xd, yd);
        ctx.stroke();
        AppModel.cloneCanvas();
      };
      canvasBasic.onmouseup = function onmouseup() {
        canvasBasic.onmousemove = null;
      };
    };
  }

  illuminationBoton() {
    // const btnContainer = document.querySelector('.pencil-width');

    // // Get all buttons with class="btn" inside the container
    // const btns = btnContainer.getElementsByClassName('wrapper-width');
    // console.log('btns', btns);

    // // Loop through the buttons and add the active class to the current/clicked button
    // for (let i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active');

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(' active', '');
    }

    // Add the active class to the current/clicked button
    this.className += ' active';
    //   });
    // }
  }
}
