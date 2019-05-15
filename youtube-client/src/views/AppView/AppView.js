export default class AppView {
  constructor(titles) {
    this.titles = titles;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    document.body.appendChild(wrapper);

    const searchWrapper = document.createElement('form');
    searchWrapper.className = 'search-wrapper';
    wrapper.appendChild(searchWrapper);

    const search = document.createElement('input');
    search.type = 'text';
    search.className = 'input-field';
    search.setAttribute('onChange', '');
    searchWrapper.appendChild(search);

    const btnInputSearch = document.createElement('button');
    btnInputSearch.className = 'btn-input-search';
    btnInputSearch.textContent = 'Search';
    searchWrapper.appendChild(btnInputSearch);


    const content = document.createElement('section');
    content.className = 'content-wrapper';
    console.log('this title appView', this.titles);
    document.body.appendChild(content);

    btnInputSearch.onclick = (e) => {
      const input = document.querySelector('.input-search').value;
      e.preventDefault();
      console.log('input', input);
      return input;
    };
  }

  render2() {
    let currentCountVideoOnPage = 10;
    const countVideo = () => {
      const screenWidth = document.documentElement.clientWidth;
      currentCountVideoOnPage = 3;
      if (screenWidth <= 1400) {
        currentCountVideoOnPage = 3;
      }
      if (screenWidth <= 1000) {
        currentCountVideoOnPage = 2;
      }
      if (screenWidth <= 700) {
        currentCountVideoOnPage = 1;
      }
      return currentCountVideoOnPage;
    };

    countVideo();
    function renderMarkupVideoIdMini(titles) {
      for (let i = 0; i < currentCountVideoOnPage; i += 1) {
        // console.log('titles', titles[i]);
        createVideoMiniItem(titles[i]);
      }
    }

    renderMarkupVideoIdMini(this.titles);

    function createVideoMiniItem(item) {
      //       console.log(item);
      const section = document.querySelector('.content-wrapper');
      const box = document.createElement('div');
      box.className = 'box';
      section.appendChild(box);

      const videoMiniItemImg = document.createElement('div');
      videoMiniItemImg.className = 'block-video-item-img';
      box.appendChild(videoMiniItemImg);

      const videoMiniItemInfo = document.createElement('div');
      videoMiniItemInfo.className = 'block-video-item-info';
      box.appendChild(videoMiniItemInfo);

      const newImg = document.createElement('img');
      newImg.className = 'video-img';
      newImg.src = item.snippet.thumbnails.medium.url;
      videoMiniItemImg.appendChild(newImg);

      const newTitle = document.createElement('h3');
      newTitle.className = 'title-info';
      newTitle.textContent = item.snippet.title;
      videoMiniItemInfo.appendChild(newTitle);

      const newAuthor = document.createElement('p');
      newAuthor.className = 'author-info';
      newAuthor.textContent = `channel Title: ${item.snippet.channelTitle}`;
      videoMiniItemInfo.appendChild(newAuthor);

      // const newViewCount = document.createElement('p');
      // newViewCount.className = 'viewCountInfo';
      // newViewCount.textContent = `view Count: ${item.statistics.viewCount}`;
      // videoMiniItemInfo.appendChild(newViewCount);

      const newDescription = document.createElement('p');
      newDescription.className = 'new-description-info';
      newDescription.textContent = item.snippet.description;
      videoMiniItemInfo.appendChild(newDescription);

      const newPublishedDate = document.createElement('p');
      newPublishedDate.className = 'published-date-info';
      newPublishedDate.textContent = `published Date: ${getPrettyDate(item.snippet.publishedAt)}`;
      videoMiniItemInfo.appendChild(newPublishedDate);

      function getPrettyDate(timestamp) {
        const date = new Date(timestamp);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        return date.toLocaleString('ru', options);
      }
    }
  }
}
