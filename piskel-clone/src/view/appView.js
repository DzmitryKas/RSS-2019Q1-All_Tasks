/* eslint-disable class-methods-use-this */
export default class AppView {
  constructor(state) {
    this.state = state;
  }

  resizeCanvas(element, scale, widthCanvas) {
    const canvasBasic = document.querySelectorAll('#canvas-basic');

    canvasBasic[element].style.transform = `scale(${scale}, ${scale})`;
    canvasBasic[element].width = widthCanvas;
    canvasBasic[element].height = widthCanvas;
    const ctxResize = canvasBasic[element].getContext('2d');

    ctxResize.drawImage(canvasBasic[element], 0, 0, widthCanvas, widthCanvas);
  }

  // Создание рамки для отрисовки, удаление кадра и создание копии
  drawWrapperCanvas(pastAfteElement) {
    const menuFrame = document.querySelector('.menu-frame');
    const canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'canvas-wrapper';
    menuFrame.insertBefore(canvasWrapper, menuFrame.children[pastAfteElement]);

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

    const sectionBasicCanvas = document.querySelector('.wrapper-field-paint');
    const wrapperPaint = document.createElement('div');
    wrapperPaint.className = 'field-paint';
    sectionBasicCanvas.insertBefore(wrapperPaint, sectionBasicCanvas.children[pastAfteElement]);


    const fieldPaint = document.querySelectorAll('.field-paint');
    const canvasBasic = document.createElement('canvas');
    canvasBasic.id = 'canvas-basic';
    fieldPaint[pastAfteElement].appendChild(canvasBasic);
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
