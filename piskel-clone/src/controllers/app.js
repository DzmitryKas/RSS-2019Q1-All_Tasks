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
    });
    const view = new AppView();
    view.drawKlektis();

    document.querySelector('.pen').addEventListener('click', () => {
      model.drawPen(ctxWidth, myColor);
      document.querySelector('.small').addEventListener('click', () => {
        const ctxWidth = 1;
        model.drawPen(ctxWidth, myColor);
      });

      document.querySelector('.medium-one').addEventListener('click', () => {
        const ctxWidth = 2;
        model.drawPen(ctxWidth, myColor);
      });

      document.querySelector('.medium-two').addEventListener('click', () => {
        const ctxWidth = 3;
        model.drawPen(ctxWidth, myColor);
      });

      document.querySelector('.big').addEventListener('click', () => {
        const ctxWidth = 4;
        model.drawPen(ctxWidth, myColor);
      });
    });
  }
}
