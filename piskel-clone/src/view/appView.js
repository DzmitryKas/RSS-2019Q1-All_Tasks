/* eslint-disable class-methods-use-this */
export default class AppView {
  constructor(state) {
    this.state = state;
  }

  drawKlektis(element) {
    // отрисовка шахматной доски
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    console.log('canvasBasic', canvasBasic);
    const ctx = canvasBasic[element].getContext('2d');
    canvasBasic[element].style.transform = 'scale(5, 5)';
    ctx.strokeRect(15, 15, 266, 266);
    ctx.strokeRect(18, 18, 260, 260);
    canvasBasic[element].width = 128;
    canvasBasic[element].height = 128;
    ctx.fillStyle = '#4c4c4c'; // меняем цвет клеток
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 128; i += 2) {
      for (let j = 0; j < 128; j += 2) {
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

    basket.addEventListener('click', () => {
      menuFrame.removeChild(canvasWrapper);
      numberFrame();
    });

    doubleFile.addEventListener('click', () => {
      drawWrapperCanvas();
      numberFrame();
    });


    numberFrame();
  }
}
