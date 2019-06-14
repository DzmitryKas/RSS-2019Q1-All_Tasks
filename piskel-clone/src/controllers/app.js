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
    const ctxWidth = 1;

    const colorCurrent = document.querySelector('.first-current-color');
    let myColor = 'black';
    colorCurrent.addEventListener('input', function () {
      myColor = this.value;
      // console.log('this.value', myColor);
      model.drawPen(ctxWidth, myColor);
      model.cloneCanvas();
    });

    const view = new AppView();
    view.drawKlektis();

    document.querySelector('.pen').addEventListener('click', () => {
      model.drawPen(ctxWidth, myColor);
    });

    document.querySelector('.add-frame').addEventListener('click', () => {
      view.drawWrapperCanvas();
      // const frame = draw();
      // frames.push(frame);
      // resetCanvas();
      // draw();
    });

    const btnContainer = document.querySelector('.pencil-width');

    const btns = btnContainer.getElementsByClassName('wrapper-width');
    console.log('btns', btns);
    // Loop through the buttons and add the active class to the current/clicked button
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        const ctxWidth = i + 1;
        model.drawPen(ctxWidth, myColor);
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
