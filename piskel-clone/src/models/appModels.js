/* eslint-disable class-methods-use-this */
export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  cloneCanvas(element) {
    // create a new canvas
    const newCanvas = document.querySelectorAll('.canvas-mini');
    const newContext = newCanvas[element].getContext('2d');

    const oldCanvas = document.querySelectorAll('#canvas-basic');

    // set dimensions
    newCanvas[element].width = oldCanvas[element].width;
    newCanvas[element].height = oldCanvas[element].height;

    // apply the old canvas to the new one
    newContext.drawImage(oldCanvas[element], 0, 0);
  }

  drawPen(lineWidth, myColor, element) {
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    const ctx = canvasBasic[element].getContext('2d');

    canvasBasic[element].onmousedown = function onmousedown(event) {
      ctx.beginPath();
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.strokeStyle = myColor;
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.moveTo(x, y);
      canvasBasic[element].onmousemove = function onmousemove(e) {
        const xd = e.offsetX;
        const yd = e.offsetY;
        ctx.lineTo(xd, yd);
        ctx.stroke();
        function cloneCanvas() {
          // create a new canvas
          const newCanvas = document.querySelectorAll('.canvas-mini');
          const newContext = newCanvas[element].getContext('2d');

          const oldCanvas = document.querySelectorAll('#canvas-basic');

          // set dimensions
          newCanvas[element].width = oldCanvas[element].width;
          newCanvas[element].height = oldCanvas[element].height;

          // apply the old canvas to the new one
          newContext.drawImage(oldCanvas[element], 0, 0);
        }
        cloneCanvas(element);
      };
      canvasBasic[element].onmouseup = function onmouseup() {
        canvasBasic[element].onmousemove = null;
      };
    };
  }
}
