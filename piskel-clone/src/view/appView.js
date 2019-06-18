/* eslint-disable class-methods-use-this */
export default class AppView {
  constructor(state) {
    this.state = state;
  }

  drawKlektis(element, scale, widthCanvas) {
    // отрисовка шахматной доски
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    console.log('canvasBasic', canvasBasic);
    const ctx = canvasBasic[element].getContext('2d');
    canvasBasic[element].style.transform = `scale(${scale}, ${scale})`;
    // ctx.strokeRect(15, 15, 266, 266);
    // ctx.strokeRect(18, 18, 260, 260);
    canvasBasic[element].width = widthCanvas;
    canvasBasic[element].height = widthCanvas;
    ctx.fillStyle = '#4c4c4c'; // меняем цвет клеток
    ctx.fillRect(0, 0, widthCanvas, widthCanvas);
    for (let i = 0; i < widthCanvas; i += 2) {
      for (let j = 0; j < widthCanvas; j += 2) {
        ctx.clearRect(i * 2, j * 2, 2, 2);
        ctx.clearRect((i + 1) * 2, (j + 1) * 2, 2, 2);
      }
    }
  }

  // Создание рамки для отрисовки, удаление кадра и создание копии
  drawWrapperCanvas() {
    const menuFrame = document.querySelector('.menu-frame');
    const canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'canvas-wrapper';
    menuFrame.insertBefore(canvasWrapper, menuFrame.children[menuFrame.children.length - 1]);

    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-mini';
    canvasWrapper.appendChild(canvas);

    const counter = document.createElement('div');
    counter.className = 'counter';
    canvasWrapper.appendChild(counter);

    const basket = document.createElement('i');
    basket.className = 'icon-trash';
    canvasWrapper.appendChild(basket);

    const doubleFile = document.createElement('i');
    doubleFile.className = 'icon-docs';
    canvasWrapper.appendChild(doubleFile);

    const move = document.createElement('i');
    move.className = 'icon-braille';
    canvasWrapper.appendChild(move);

    const fieldPaint = document.querySelector('.field-paint');
    const canvasBasic = document.createElement('canvas');
    canvasBasic.id = 'canvas-basic';
    fieldPaint.appendChild(canvasBasic);

    // Функция определения порядкового номера кадра
    function numberFrame() {
      const counterFrame = document.querySelectorAll('.counter');
      counterFrame.forEach((el, index) => {
        counterFrame[index].innerText = index + 1;
      });
    }

    doubleFile.addEventListener('click', () => {
      drawWrapperCanvas();
      numberFrame();
    });
  }

  drawInformationCanvac(element, size) {
    const canvasBasic = document.querySelectorAll('#canvas-basic');

    canvasBasic[element].onmousemove = function onmousemove(e) {
      const xd = e.offsetX;
      const yd = e.offsetY;
      document.querySelector('.coordinates').innerHTML = `${xd} ${yd}`;
    };

    document.querySelector('.size-canvas').innerHTML = `${size}`;
  }
}
