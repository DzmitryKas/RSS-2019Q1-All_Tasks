let state = {
  currentTool: '',
};

console.log('state.mov 2 satte', state)


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
  // chooseColor.classList.add('hightlight-border')
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
  console.log(state.currentTool);
});

addEventListener('keydown', event => {
  if (event.keyCode === 80) {
    state.currentTool = 'paintFigure';
  }
});

Array.from(elementChildrens).forEach(function(transform) {
  transform.addEventListener('click', function(e) {
    if (state.currentTool === 'paintFigure') {
      console.log('e.target.style.background', e.target.style.background);
      e.target.style.background = colorValueEl.style.background;
    }
  });
});

const moveFigure = document.querySelector('#move');
moveFigure.addEventListener('click', () => {
  state.currentTool = 'moveFigure';
  console.log('state.mov', state.currentTool)
});

console.log('state.mov 2', state.currentTool)

// if (state.currentTool === '') {
//   Array.from(elementChildrens).forEach(function(figure) {
//     figure.onmousedown = function(e) {
//       var coords = getCoords(figure);
//       var shiftX = e.pageX - coords.left;
//       var shiftY = e.pageY - coords.top;

//       figure.style.position = 'absolute';
//       document.body.appendChild(figure);
//       moveAt(e);

//       figure.style.zIndex = 1000; // над другими элементами

//       function moveAt(e) {
//         figure.style.left = e.pageX - shiftX + 'px';
//         figure.style.top = e.pageY - shiftY + 'px';
//       }

//       document.onmousemove = function(e) {
//         moveAt(e);
//       };

//       figure.onmouseup = function() {
//         document.onmousemove = null;
//         figure.onmouseup = null;
//         figure.onmousedown = null;
//       };
//     };

//     figure.ondragstart = function() {
//       return false;
//     };

//     function getCoords(elem) {
//       var box = elem.getBoundingClientRect();
//       return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset,
//       };
//     }
//   });
// }
