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

    const ctxWidth = 1;
    let element = 0;
    console.log('element', element);

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
      let fps = 1;
      const menuFrame = document.querySelector('.menu-frame');
      element = menuFrame.children.length - 1;
      console.log('element1', element);
      view.drawWrapperCanvas();
      view.drawKlektis(element);
      model.cloneCanvas(element);
      const arrayPicktures = model.getFrames();
      model.animation(arrayPicktures, fps);

      document.getElementById('r1').addEventListener('input', () => {
        const rng = document.getElementById('r1');
        const i1 = document.getElementById('i1');
        i1.value = `${rng.value} fps`;
        fps = rng.value;
        model.animation(arrayPicktures, fps);
      });
    });


    const btnContainer = document.querySelector('.pencil-width');
    const btns = btnContainer.getElementsByClassName('wrapper-width');
    console.log('btns', btns);
    // Loop through the buttons and add the active class to the current/clicked button
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        const ctxWidth = i + 1;
        model.drawPen(ctxWidth, myColor, element);
        console.log('i', i);
        const current = document.getElementsByClassName('active');
        if (current.length > 0) {
          current[0].className = current[0].className.replace(' active', '');
        }
        this.className += ' active';
      });
    }
  }
}
