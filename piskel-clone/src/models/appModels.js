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

  copyCanvas(index) {
    const arrayCanvasFrames = document.querySelectorAll('.canvas-mini');
    const arrayCanvasBasic = document.querySelectorAll('#canvas-basic');

    const contextCanvasFrame = arrayCanvasFrames[index + 1].getContext('2d');
    const contextCanvasBasic = arrayCanvasBasic[index + 1].getContext('2d');

    arrayCanvasFrames[index + 1].width = arrayCanvasFrames[index].width;
    arrayCanvasFrames[index + 1].height = arrayCanvasBasic[index].height;

    arrayCanvasBasic[index + 1].width = arrayCanvasBasic[index].width;
    arrayCanvasBasic[index + 1].height = arrayCanvasBasic[index].height;

    contextCanvasFrame.drawImage(arrayCanvasFrames[index], 0, 0);
    contextCanvasBasic.drawImage(arrayCanvasBasic[index], 0, 0);
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

  drawLine(lineWidth, myColor, element) {
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    const ctx = canvasBasic[element].getContext('2d');

    canvasBasic[element].onmousedown = function onmousedown(event) {
      ctx.beginPath();
      const x = event.offsetX;
      const y = event.offsetY;
      ctx.strokeStyle = myColor;
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;

      canvasBasic[element].onmousemove = function onmousemove(e) {
        ctx.beginPath();
        const xd = e.offsetX;
        const yd = e.offsetY;
        ctx.moveTo(x, y);
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

  getFrames() {
    const arrayLinks = [];
    const arrayPictures = [];
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    canvasBasic.forEach((element) => {
      const picture = element.toDataURL();
      arrayLinks.push(picture);
    });

    arrayLinks.forEach((element) => {
      const img = new Image(); // Создаём новый объект Image
      img.src = element; // Устанавливаем путь к источнику
      arrayPictures.push(img);
    });

    return arrayPictures;
  }

  animation(array, frameRate) {
    let count = 0;

    const canvasAnimation = document.querySelector('.canvas-animation');
    const context = canvasAnimation.getContext('2d');
    const canvasMini = document.querySelector('.canvas-mini');

    canvasAnimation.width = canvasMini.width;
    canvasAnimation.height = canvasMini.height;

    const timerId = setInterval(() => {
      context.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
      if (count < array.length) {
        context.drawImage(array[count], 0, 0);
        count += 1;
      } else {
        count = 0;
      }
    }, 1000 / frameRate);
    return timerId;
  }

  clearAnimation(timerId) {
    clearInterval(timerId);
  }

  // Функция определения порядкового номера кадра
  numberFrame() {
    const counterFrame = document.querySelectorAll('.counter');
    counterFrame.forEach((el, index) => {
      counterFrame[index].innerText = index + 1;
    });
  }
}
