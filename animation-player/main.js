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
    }
  });
});

const moveFigure = document.querySelector('#move');
moveFigure.addEventListener('click', () => {
  state.currentTool = 'moveFigure';
});

const frame = document.querySelector('.add-frame');
const menuFrame = document.querySelector('.menu-frame');

frame.addEventListener('click', () => { 
  const canvas = document.createElement('div');
  canvas.className = 'canvas-mini';
  menuFrame.insertBefore(canvas, menuFrame.children[menuFrame.children.length - 1]);

  const counter = document.createElement('div');
  counter.className = 'counter';
  canvas.appendChild(counter);

  const basket = document.createElement('i');
  basket.className = 'icon-trash';
  canvas.appendChild(basket);

  const doubleFile = document.createElement('i');
  doubleFile.className = 'icon-docs';
  canvas.appendChild(doubleFile);

  const move = document.createElement('i');
  move.className = 'icon-braille';
  canvas.appendChild(move);  

  basket.addEventListener('click', () => {    
    menuFrame.removeChild(canvas)  
    numberFrame()  
  });
  
  doubleFile.addEventListener('click', () => { 
    canvasDouble = canvas.cloneNode(true);   
    menuFrame.insertBefore(canvasDouble, menuFrame.children[menuFrame.children.length-1]); 
    numberFrame()
  });
  
  function numberFrame() {
    const counter = document.querySelectorAll('.counter');
    counter.forEach(function(el, index) {     
      counter[index].innerText = index + 1;
    });
  }
  numberFrame()
});

