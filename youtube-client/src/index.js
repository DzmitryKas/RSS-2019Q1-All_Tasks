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
const mainSection = () => document.querySelector('.content-wrapper');

btnInputSearch.onclick = (e) => {
  const input = document.querySelector('.input-field').value;
  e.preventDefault();
  if (mainSection()) {
    mainSection().remove();
  }

  const main = document.createElement('main');
  main.className = 'main';
  document.body.appendChild(main);

  const content = document.createElement('section');
  content.className = 'content-wrapper';
  main.appendChild(content);

  const app = new App(input);
  app.start();
  app.start2();
};
