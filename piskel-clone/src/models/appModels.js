/* eslint-disable class-methods-use-this */
export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  // selectionColor() {

  //   return myColor;
  // }

  drawPen(lineWidth, myColor) {
    // const myColor = chCol();
    // console.log('myColor', myColor);
    // const myColor = 'red';


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
      };
      canvasBasic.onmouseup = function onmouseup() {
        canvasBasic.onmousemove = null;
      };
    };
  }
}
