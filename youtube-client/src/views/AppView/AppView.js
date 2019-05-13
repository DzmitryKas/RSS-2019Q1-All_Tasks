export default class AppView {
  constructor(titles) {
    this.titles = titles;
  }

  render() {
    const wrapper = document.createElement('div');
    document.body.appendChild(wrapper);
    wrapper.id = 'wrapper';
    const SearchWrapper = document.createElement('div');
    wrapper.appendChild(SearchWrapper);
    SearchWrapper.id = 'search-wrapper';
    const Search = document.createElement('input');
    SearchWrapper.appendChild(Search);
    Search.type = 'text';
    Search.id = 'input-field';
    const content = document.createElement('ul');
    console.log(this.titles);
    content.innerHTML = this.titles.map(titles => `<li>${titles}<li>`).join('');
    wrapper.appendChild(content);
  }
}
// function makeUrl() {
//   const inputElement = document.getElementById('input-field');
//   // eslint-disable-next-line no-unused-vars
//   const link = this.state.url + inputElement.value;
//   console.log('inputElement', inputElement.value);
// }
// makeUrl();
