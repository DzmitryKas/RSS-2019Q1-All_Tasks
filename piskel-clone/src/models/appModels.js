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

        ctx.save();
        // ctx.clearRect(0, 0, canvasBasic[element].width, canvasBasic[element].height);
        ctx.beginPath();
        console.log('ctx.width', canvasBasic[element].width);

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

        ctx.restore();
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

  // paintBucket(element) {
  //   const canvasBasic = document.querySelectorAll('#canvas-basic');
  //   // const context = canvasBasic[element].getContext('2d');

  //   // let imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);

  //   canvasBasic[element].onmousedown = function onmousedown(e) {
  //     function matchStartColor(pixelPos) {
  //       const r = colorLayer.data[pixelPos];
  //       const g = colorLayer.data[pixelPos + 1];
  //       const b = colorLayer.data[pixelPos + 2];

  //       return (r === startR && g === startG && b === startB);
  //     }

  //     function colorPixel(pixelPos) {
  //       colorLayer.data[pixelPos] = fillColorR;
  //       colorLayer.data[pixelPos + 1] = fillColorG;
  //       colorLayer.data[pixelPos + 2] = fillColorB;
  //       colorLayer.data[pixelPos + 3] = 255;
  //     }
  //     const startX = e.offsetX;
  //     const startY = e.offsetY;
  //     const canvasWidth = canvasBasic[element].width;
  //     const canvasHeight = canvasBasic[element].height;
  //     const pixelStack = [[startX, startY]];

  //     while (pixelStack.length) {
  //       let newPos;
  //       let x;
  //       let y;
  //       let pixelPos;
  //       let reachLeft;
  //       let reachRight;
  //       newPos = pixelStack.pop();
  //       x = newPos[0];
  //       y = newPos[1];

  //       pixelPos = (y * canvasWidth + x) * 4;
  //       while (y-- >= 0 && matchStartColor(pixelPos)) {
  //         pixelPos -= canvasWidth * 4;
  //       }
  //       pixelPos += canvasWidth * 4;
  //       ++y;
  //       reachLeft = false;
  //       reachRight = false;
  //       while (y++ < canvasHeight - 1 && matchStartColor(pixelPos)) {
  //         colorPixel(pixelPos);

  //         if (x > 0) {
  //           if (matchStartColor(pixelPos - 4)) {
  //             if (!reachLeft) {
  //               pixelStack.push([x - 1, y]);
  //               reachLeft = true;
  //             }
  //           } else if (reachLeft) {
  //             reachLeft = false;
  //           }
  //         }

  //         if (x < canvasWidth - 1) {
  //           if (matchStartColor(pixelPos + 4)) {
  //             if (!reachRight) {
  //               pixelStack.push([x + 1, y]);
  //               reachRight = true;
  //             }
  //           } else if (reachRight) {
  //             reachRight = false;
  //           }
  //         }

  //         pixelPos += canvasWidth * 4;
  //       }
  //     }
  //     context.putImageData(colorLayer, 0, 0);
  //   };
  // }

  erasing(element) {
    const canvasBasic = document.querySelectorAll('#canvas-basic');
    const ctx = canvasBasic[element].getContext('2d');

    canvasBasic[element].onmousedown = function onmousedown() {
      canvasBasic[element].onmousemove = function onmousemove(e) {
        const xd = e.offsetX;
        const yd = e.offsetY;
        ctx.clearRect(xd - 2, yd - 2, 4, 4);

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
