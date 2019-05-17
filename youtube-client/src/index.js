import App from './controllers/App';

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.appendChild(wrapper);

const searchWrapper = document.createElement('form');
searchWrapper.className = 'search-wrapper';
wrapper.appendChild(searchWrapper);

const search = document.createElement('input');
search.type = 'text';
search.placeholder = 'Find video';
search.className = 'input-field';
search.setAttribute('onChange', '');
searchWrapper.appendChild(search);

const btnInputSearch = document.createElement('button');
btnInputSearch.className = 'btn-input-search';
btnInputSearch.textContent = 'Search';
searchWrapper.appendChild(btnInputSearch);

const main = document.createElement('main');
main.className = 'main';
document.body.appendChild(main);

const content = document.createElement('section');
content.className = 'content-wrapper';
main.appendChild(content);
console.log(main.appendChild.length);

// const mainn = document.querySelector('.content-wrapper');
console.log('content.appendChild', content.childElementCount);

btnInputSearch.onclick = (e) => {
  const input = document.querySelector('.input-field').value;
  e.preventDefault();
  if (content.childElementCount > 1) {
    const elem = document.querySelector('.box');
    elem.parentNode.removeChild(elem);
    // content.childElement.remove();
  }
  console.log('input', input);
  // mainn.remove();
  const app = new App(input);
  app.start();
};
