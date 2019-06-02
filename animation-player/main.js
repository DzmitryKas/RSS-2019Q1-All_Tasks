let state = {
  currentTool: '',
};

const transformBtn = document.querySelector('#transform');
transformBtn.addEventListener('click', () => {
  state.currentTool = 'transformFigure';
});

addEventListener('keydown', event => {
  if (event.keyCode == 84) {
    state.currentTool = 'transformFigure';
  }
});

let elementChildrens = document.querySelector('#canvas').children;
Array.from(elementChildrens).forEach(function(transform) {
  transform.addEventListener('click', function(e) {
    if (state.currentTool === 'transformFigure') {
      e.target.classList.toggle('circle');
    }
  });
});

const chooseColor = document.querySelector('#choose-color');
chooseColor.addEventListener('click', () => {
  state.currentTool = 'chooseColor';
  console.log(state.currentTool);
});

addEventListener('keydown', event => {
  if (event.keyCode == 67) {
    state.currentTool = 'chooseColor';
  }
});

const colorValueEl = document.getElementById('circle-current');
const menu = document.getElementsByTagName('div');
let color = [];
Array.from(menu).forEach(function(e) {
  e.addEventListener('click', function() {
    if (state.currentTool === 'chooseColor') {
      let style = getComputedStyle(e);
      colorValueEl.style.background = style.backgroundColor;
      color.push(style.backgroundColor);
      let prevColorValueEl = document.getElementById('circle-prev');
      prevColorValueEl.style.background = color[color.length - 2];
    }
  });
});

const paintFigure = document.querySelector('#paint-bucket');
paintFigure.addEventListener('click', () => {
  state.currentTool = 'paintFigure';
});

addEventListener('keydown', event => {
  if (event.keyCode === 80) {
    state.currentTool = 'paintFigure';
  }
});

Array.from(elementChildrens).forEach(function(transform) {
  transform.addEventListener('click', function(e) {
    if (state.currentTool === 'paintFigure') {
      e.target.style.background = colorValueEl.style.background;
      draw();
    }
  });
});

const moveFigure = document.querySelector('#move');
moveFigure.addEventListener('click', () => {
  state.currentTool = 'moveFigure';
});

// Создание массива цветов, и на их основе отрисовка кадра
const draw = () => {
  let framesDom = document.querySelectorAll('#square');
  let arrColor1 = [];
  let arrColor2 = [];
  let arrColor3 = [];
  let arrColor = [arrColor1, arrColor2, arrColor3];

  framesDom.forEach(function(element, index) {
    if (index < 3) {
      let color = getComputedStyle(element).backgroundColor;
      arrColor1.push(color);
    }

    if (index > 2 && index < 6) {
      let color = getComputedStyle(element).backgroundColor;
      arrColor2.push(color);
    }

    if (index > 5 && index < 9) {
      let color = getComputedStyle(element).backgroundColor;
      arrColor3.push(color);
    }
  });

  let canvasMini = document.querySelectorAll('.canvas-mini');
  let ctx = canvasMini[canvasMini.length - 1].getContext('2d');

  arrColor.forEach((row, m) => {
    row.forEach((column, n) => {
      ctx.fillStyle = column;
      ctx.fillRect(n * 102, m * 51, 100, 50);
    });
  });
  return arrColor;
};

// Создание рамки для отрисовки, удаление кадра и создание копии
function drawCanvas() {
  const menuFrame = document.querySelector('.menu-frame');
  const canvasWrapper = document.createElement('div');
  canvasWrapper.className = 'canvas-wrapper';
  menuFrame.insertBefore(canvasWrapper, menuFrame.children[menuFrame.children.length - 1]);

  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-mini';
  canvasWrapper.appendChild(canvas);

  const counter = document.createElement('div');
  counter.className = 'counter';
  canvasWrapper.appendChild(counter);

  const basket = document.createElement('i');
  basket.className = 'icon-trash';
  canvasWrapper.appendChild(basket);

  const doubleFile = document.createElement('i');
  doubleFile.className = 'icon-docs';
  canvasWrapper.appendChild(doubleFile);

  const move = document.createElement('i');
  move.className = 'icon-braille';
  canvasWrapper.appendChild(move);

  basket.addEventListener('click', () => {
    menuFrame.removeChild(canvasWrapper);
    numberFrame();
  });

  doubleFile.addEventListener('click', () => {
    drawCanvas();
    const frame = draw();
    frames.push(frame);
    numberFrame();
  });

  // Функция определения порядкового номера кадра
  function numberFrame() {
    const counter = document.querySelectorAll('.counter');
    counter.forEach(function(el, index) {
      counter[index].innerText = index + 1;
    });
  }
  numberFrame();
}

// Отрисовка кадров на холсте предварительного просмотра
const drawAnimation = arr => {
  let canvasAnimation = document.querySelector('.canvas-animation');
  let ctx = canvasAnimation.getContext('2d');

  arr.forEach((row, m) => {
    row.forEach((column, n) => {
      ctx.fillStyle = column;
      ctx.fillRect(n * 102, m * 51, 100, 50);
    });
  });
};

// Изменение FPS анимации
function fun1() {
  let rng = document.getElementById('r1');
  let i1 = document.getElementById('i1');
  i1.value = rng.value + ' fps';
  return rng.value;
}

let frameRate = 5;
let count = 1;
let rng = document.getElementById('r1');
let b = 0;

// Создание анимации на основе полученных кадров
const startAnimation = frames => {
  frameRate = fun1();
    clearInterval(timerId);
  var timerId = setInterval(() => {
    if (count < frames.length) {
      const frame = frames[count];
      drawAnimation(frame);
      count++;
    } else {
      count = 1;
    }
  }, 1000 / frameRate);
  
};

// Обновление холста
const resetCanvas = () => {
  let colorSquare = document.querySelectorAll('#square');
  colorSquare.forEach(function(el) {
    el.style.background = 'red';
  });
};

const frames = [];
document.querySelector('.add-frame').addEventListener('click', () => {
  drawCanvas();
  const frame = draw();
  frames.push(frame);
  resetCanvas();
  draw();
});

//Старт
document.querySelector('.start').addEventListener('click', () => {
  startAnimation(frames);
});

