
export default class App {
  constructor(value) {
    this.value = value;
  }


  start() {
    // отрисовка шахматной доски
    const canvasBasic = document.getElementById('canvas-basic');
    const ctx = canvasBasic.getContext('2d');
    ctx.strokeRect(15, 15, 266, 266);
    ctx.strokeRect(18, 18, 260, 260);
    canvasBasic.width = 128;
    canvasBasic.height = 128;
    ctx.fillStyle = '#4c4c4c'; // меняем цвет клеток
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 128; i += 2) {
      for (let j = 0; j < 128; j += 2) {
        ctx.clearRect(i * 2, j * 2, 2, 2);
        ctx.clearRect((i + 1) * 2, (j + 1) * 2, 2, 2);
      }
    }
    canvasBasic.style.transform = 'scale(5, 5)';

    function changeColor() {
      const colorCurrent = document.querySelector('.first-current-color');
      colorCurrent.addEventListener('input', function inputValue() {
        myColor = this.value;
      });
    }

    function drawPen() {
      let myColor = 'red';



      canvasBasic.onmousedown = function onmousedown(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.strokeStyle = myColor;
        ctx.lineCap = 'round';
        ctx.lineWidth = 4;
        ctx.moveTo(x, y);
        canvasBasic.onmousemove = function onmousemove(event) {
          const x = event.offsetX;
          const y = event.offsetY;
          ctx.lineTo(x, y);
          ctx.stroke();
        };
        canvasBasic.onmouseup = function onmouseup() {
          canvasBasic.onmousemove = null;

        };
      };
      changeColor();
    }

    document.querySelector('.pen').addEventListener('click', () => {
    drawPen();

  });


    //   const model = new AppModel(this.value);
    //   const pageToken = await model.getnextPageToken(token);
    //   const data = await model.getClipId(pageToken);
    //   const inform = await model.getClipInform(data);
    //   const view = new AppView(inform);
    //   view.render();

  //   const section = document.querySelector('.content-wrapper');
  //   section.onscroll = async () => {
  //     if (section.scrollLeft + section.offsetWidth >= section.scrollWidth) {
  //       const app = new App(this.value);
  //       app.start(pageToken);
  //     }
  //   };
  }
}
