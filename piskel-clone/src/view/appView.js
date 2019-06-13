export default class AppView {
  constructor(state) {
    this.state = state;
  }

   drawKlektis() {
    // отрисовка шахматной доски
    const canvasBasic = document.getElementById('canvas-basic');
    const ctx = canvasBasic.getContext('2d');
    canvasBasic.style.transform = 'scale(5, 5)';
    ctx.strokeRect(15, 15, 266, 266);
    ctx.strokeRect(18, 18, 260, 260);
    canvasBasic.width = 128;
    canvasBasic.height = 128;
    ctx.fillStyle = '#4c4c4c'; // меняем цвет клеток
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 128; i += 2) {
      for (let j = 0; j < 128; j += 2) {
        ctx.clearRect(i * 2, j * 2, 2, 2);
        ctx.clearRect((i + 1) * 2, (j + 1) * 2, 2, 2);
      }
    }
  }
}
