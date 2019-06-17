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

    const rng = document.getElementById('r1');
    const i1 = document.getElementById('i1');
    i1.value = `${rng.value} fps`;

    const colorCurrent = document.querySelector('.first-current-color');
    let myColor = 'black';
    colorCurrent.addEventListener('input', function () {
      myColor = this.value;
      model.drawPen(ctxWidth, myColor, element);
      // model.cloneCanvas(element);
    });


    view.drawKlektis(element);
    model.cloneCanvas(element);

    document.querySelector('.pen').addEventListener('click', () => {
      model.drawPen(ctxWidth, myColor, element);
    });

    document.querySelector('.add-frame').addEventListener('click', () => {
      const menuFrame = document.querySelector('.menu-frame');
      element = menuFrame.children.length - 1;
      console.log('element1', element);
      view.drawWrapperCanvas();
      view.drawKlektis(element);
      model.cloneCanvas(element);
      const arrayPicktures = model.getFrames();
      model.clearAnimation(timerID);
      timerID = model.animation(arrayPicktures, fps);

      // let arrayBasket = document.getElementsByClassName('icon-trash');
      // for (let i = 0; i < arrayBasket.length; i++) {
      //   arrayBasket.addEventListener('click', (e) => {
      //     // const menuFrame = document.querySelector('.menu-frame');
      //     arrayBasket = document.getElementsByClassName('icon-trash');
      //     const canvasWrapper = document.getElementsByClassName('canvas-wrapper');
      //     const arrayCanvas = document.querySelectorAll('#canvas-basic');
      //     const fieldCanvas = document.querySelector('.field-paint');
      //     // Array.from(arrayBasket).forEach((el, index) => {
      //     if (arrayBasket[i] === e.target) {
      //       console.log('arrayBasket', arrayBasket);
      //       console.log('arrayBasket[i]', arrayBasket[i]);
      //       menuFrame.removeChild(canvasWrapper[i]);
      //       Array.from(arrayCanvas).forEach((el1, index1) => {
      //         if (i === index1) {
      //           console.log('i', i);
      //           console.log('index1', index1);
      //           fieldCanvas.removeChild(el1);
      //         }
      //       });
      //     }
      // });
      // model.numberFrame();
      // });
      // model.numberFrame();
      // }
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


    // const arrayBasket = document.getElementsByClassName('icon-trash');
    // console.log('arrayBasket', arrayBasket);
    // Array.from(arrayBasket).forEach((el) => {
    //   el.addEventListener('click', (e) => {
    //     console.log('e', e.target);
    //   });
    // });
    //   if (el === e.target) {
    //     console.log('e.target', e.target);
    //   }
    // });


    // menuFrame.removeChild(canvasWrapper);
    // numberFrame();
  }
}
