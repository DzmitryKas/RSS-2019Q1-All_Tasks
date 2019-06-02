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

// const frame = document.querySelector('.add-frame');


// frame.addEventListener('click', () => { 
    const draw = () => {
        
    let framesDom = document.querySelectorAll('#square');
    let arrColor1 = [];
    let arrColor2 = [];
    let arrColor3 = [];
    let arrColor = [arrColor1, arrColor2, arrColor3];

    framesDom.forEach(function(element, index) {
    if (index < 3){
    let color = getComputedStyle(element).backgroundColor;
    arrColor1.push(color);}
    if (index > 2 && index < 6){
    let color = getComputedStyle(element).backgroundColor;
    arrColor2.push(color);}
    if (index > 5 && index < 9){
    let color = getComputedStyle(element).backgroundColor;
    arrColor3.push(color);}
  })

    let canvasMini = document.querySelectorAll('.canvas-mini');  
    // if (canvas.getContext) {
      let ctx = canvasMini[canvasMini.length - 1].getContext('2d');

      arrColor.forEach((row, m) => {
        row.forEach((column, n) => {
            ctx.fillStyle = column;
            ctx.fillRect((n * 51), (m * 51), 50, 50);
        })
      })
    // }
  }

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
    menuFrame.removeChild(canvasWrapper)  
    numberFrame()  
  });
  
  doubleFile.addEventListener('click', () => { 
    canvasDouble = canvasWrapper.cloneNode(true);   
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
} 

   document.querySelector('.add-frame').addEventListener('click', () => {
    drawCanvas();
    draw();
 })
