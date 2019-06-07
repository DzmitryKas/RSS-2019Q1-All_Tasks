import './app-view.css';
import './reset.css';

const canvasBasic = document.getElementById('canvas-basic');

const ctx = canvasBasic.getContext('2d');
console.log(ctx);
for (let i = 0; i < 940; i += 4) {
  for (let j = 0; i < 940; j += 4) {
    if (j % 2 === 0) {
      ctx.fillStyle = 'red';
      ctx.fillRect(i, j, 4, 4);
    }
  }
}

// arrColor.forEach((row, m) => {
//   row.forEach((column, n) => {
//     ctx.fillStyle = column;
//     ctx.fillRect(n * 102, m * 51, 100, 50);
//   });
// });

// document.querySelector('.pen').addEventListener((e) => {

// });
