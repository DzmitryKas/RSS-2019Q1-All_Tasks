import './app-view.css';
import './reset.css';

// отрисовка шахматной доски
const canvasBasic = document.getElementById('canvas-basic');
const ctx = canvasBasic.getContext('2d');
ctx.strokeRect(15, 15, 266, 266);
ctx.strokeRect(18, 18, 260, 260);
canvasBasic.width = 800;
canvasBasic.height = 800;
ctx.fillStyle = '#4c4c4c'; // меняем цвет клеток
ctx.fillRect(0, 0, 800, 800);
for (let i = 0; i < 128; i += 2) {
  for (let j = 0; j < 128; j += 2) {
    ctx.clearRect(i * 8, j * 8, 8, 8);
    ctx.clearRect((i + 1) * 8, (j + 1) * 8, 8, 8);
  }
}


// document.querySelector('.pen').addEventListener((e) => {
let myColor = 'red';

// document.getElementById('colorrr').oninput = function () {
// myColor = this.value;
// ctx.beginPath();
// };
document.getElementsByClassName('first-current-color').oninput = function () {
  console.log(this.value);
   myColor = this.value;
};

canvasBasic.onmousedown = function (event) {
  // let x = event.offsetX;
  // let y = event.offsetY;
  // ctx.strokeStyle = myColor;
  // ctx.lineCap = 'round';
  // ctx.lineWidth = 15;
  // ctx.moveTo(x, y);
  canvasBasic.onmousemove = function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x);
    console.log(y);
    ctx.fillRect(x - 5, y - 5, 25, 25);
    ctx.fillStyle = myColor;
    ctx.fillStyle();
    // ctx.lineTo(x, y);
    // ctx.stroke();
  };
  canvasBasic.onmouseup = function () {
    canvasBasic.onmousemove = null;
  };
};
// });
