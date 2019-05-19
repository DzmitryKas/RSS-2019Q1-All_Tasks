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
const mainSection = () => document.querySelector('.main');
const buttonSection = () => document.querySelector('.wrapper-button');

btnInputSearch.onclick = (e) => {
  const input = document.querySelector('.input-field').value;
  e.preventDefault();
  if (mainSection()) {
    mainSection().remove();
    buttonSection().remove();
  }

  const main = document.createElement('main');
  main.className = 'main';
  document.body.appendChild(main);

  const content = document.createElement('section');
  content.className = 'content-wrapper';
  main.appendChild(content);

  const wrapperButton = document.createElement('div');
  wrapperButton.className = 'wrapper-button';
  document.body.appendChild(wrapperButton);

  const prevButton = document.createElement('button');
  prevButton.className = 'button-prev';
  wrapperButton.appendChild(prevButton);

  const prev = document.createElement('span');
  prev.className = 'prev';
  prevButton.appendChild(prev);
  prev.innerHTML = 'prev';

  const prevHidden = document.createElement('span');
  prevHidden.className = 'prevHidden';
  prevButton.appendChild(prevHidden);

  const nextButton = document.createElement('button');
  nextButton.className = 'button-next';
  wrapperButton.appendChild(nextButton);

  const next = document.createElement('span');
  next.className = 'next';
  nextButton.appendChild(next);
  next.innerHTML = 'next';

  const nextHidden = document.createElement('span');
  nextHidden.className = 'nextHidden';
  nextButton.appendChild(nextHidden);

  const app = new App(input);
  app.start();
};
