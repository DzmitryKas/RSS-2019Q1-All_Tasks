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

  getFrames() {
    const arrayPictures = [];
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    canvasBasic.forEach((element) => {
      const picture = element.toDataURL();
      arrayPictures.push(picture);
      console.log('picture', picture);
    });
    console.log('arrayPictures', arrayPictures);
    return arrayPictures;
  }

  animation(array, frameRate) {
    let count = 0;
    const arrayPictures = [];

    const canvasAnimation = document.querySelector('.canvas-animation');
    const context = canvasAnimation.getContext('2d');

    canvasAnimation.width = 128;
    canvasAnimation.height = 128;
    array.forEach((element) => {
      const img = new Image(); // Создаём новый объект Image
      img.src = element; // Устанавливаем путь к источнику
      arrayPictures.push(img);
    });
    function clearAlert() {
      clearInterval(timerId);
    }
    clearAlert();

    const timerId = setInterval(() => {
      if (count < arrayPictures.length) {
        context.drawImage(arrayPictures[count], 0, 0);
        count++;
      } else {
        count = 0;
      }
    }, 1000 / frameRate);

  }
}
