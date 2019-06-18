/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import AppModel from '../models/appModels';
import AppView from '../view/appView';

export default class App {
  constructor(value) {
    this.value = value;
  }


  start() {
    const model = new AppModel();
    const view = new AppView();

    let ctxWidth;
    let element = 0;
    let fps = 13;
    let timerID;
    let zindex = 1;
    let scale = 5;
    let widthCanvas = 128;

    view.drawInformationCanvac(element, widthCanvas);

    const rng = document.getElementById('r1');
    const i1 = document.getElementById('i1');
    i1.value = `${rng.value} fps`;

    const colorCurrent = document.querySelector('.first-current-color');
    let myColor = 'black';
    colorCurrent.addEventListener('input', function () {
      myColor = this.value;
      model.drawPen(ctxWidth, myColor, element);
    });


    view.drawKlektis(element, scale, widthCanvas);
    model.cloneCanvas(element);

    document.querySelector('.pen').addEventListener('click', () => {
      model.drawPen(ctxWidth, myColor, element);
    });

    document.querySelector('.draw-line').addEventListener('click', () => {
      model.drawLine(ctxWidth, myColor, element);
    });

    document.querySelector('.add-frame').addEventListener('click', () => {
      const menuFrame = document.querySelector('.menu-frame');
      element = menuFrame.children.length - 1;
      console.log('element1', element);
      view.drawWrapperCanvas();
      view.drawKlektis(element, scale, widthCanvas);
      model.cloneCanvas(element);
      const arrayPicktures = model.getFrames();
      model.clearAnimation(timerID);
      timerID = model.animation(arrayPicktures, fps);
    });

    document.getElementById('r1').addEventListener('input', () => {
      i1.value = `${rng.value} fps`;
      fps = rng.value;
      const arrayPicktures = model.getFrames();
      model.clearAnimation(timerID);
      timerID = model.animation(arrayPicktures, fps);
    });


    const btnContainer = document.querySelector('.pencil-width');
    const btns = btnContainer.getElementsByClassName('wrapper-width');
    console.log('btns', btns);
    // Loop through the buttons and add the active class to the current/clicked button
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        ctxWidth = i + 1;
        model.drawPen(ctxWidth, myColor, element);
        const current = document.getElementsByClassName('active');
        if (current.length > 0) {
          current[0].className = current[0].className.replace(' active', '');
        }
        this.className += ' active';
      });
    }

    document.querySelector('.full-screen').addEventListener('click', () => {
      const canvas = document.querySelector('.canvas-animation');
      function fullScreen(elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitrequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullscreen) {
          elem.mozRequestFullScreen();
        }
      }
      fullScreen(canvas);
    });

    const miniCanvasWrapper = document.querySelector('.menu-frame');
    miniCanvasWrapper.addEventListener('click', (e) => {
      const arrayBasket = document.getElementsByClassName('icon-trash');
      const canvasWrapper = document.getElementsByClassName('canvas-wrapper');
      const arrayCanvas = document.querySelectorAll('#canvas-basic');
      const fieldCanvas = document.querySelector('.field-paint');
      Array.from(arrayBasket).forEach((el, index) => {
        if (e.target === el) {
          miniCanvasWrapper.removeChild(canvasWrapper[index]);
          Array.from(arrayCanvas).forEach((el1, index1) => {
            if (index === index1) {
              fieldCanvas.removeChild(el1);
            }
          });
        }
      });
      model.numberFrame();
      const arrayPicktures = model.getFrames();
      model.clearAnimation(timerID);
      timerID = model.animation(arrayPicktures, fps);
    });

    miniCanvasWrapper.addEventListener('click', (e) => {
      console.log('el', e.target);
      const canvasWrapper = document.getElementsByClassName('canvas-mini');
      const arrayCanvas = document.querySelectorAll('#canvas-basic');
      Array.from(canvasWrapper).forEach((el, index) => {
        if (e.target === el) {
          element = index;
          Array.from(arrayCanvas).forEach((el1, index1) => {
            if (index === index1) {
              el1.style.zIndex = zindex;
              zindex++;
            }
          });
        }
      });
    });

    document.querySelector('.menu-btn').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.menu').classList.toggle('menu_active');
    });

    document.querySelector('.low-canvas').addEventListener('click', () => {
      scale = 20;
      widthCanvas = 32;
      view.drawKlektis(element, scale, widthCanvas);
      view.drawInformationCanvac(element, widthCanvas);
      console.log('widthCanvas', widthCanvas);
    });

    document.querySelector('.medium-canvas').addEventListener('click', () => {
      scale = 10;
      widthCanvas = 64;
      view.drawKlektis(element, scale, widthCanvas);
      view.drawInformationCanvac(element, widthCanvas);
      console.log('widthCanvas', widthCanvas);
    });

    document.querySelector('.big-canvas').addEventListener('click', () => {
      scale = 5;
      widthCanvas = 128;
      view.drawKlektis(element, scale, widthCanvas);
      view.drawInformationCanvac(element, widthCanvas);
      console.log('widthCanvas', widthCanvas);
    });
  }
}
