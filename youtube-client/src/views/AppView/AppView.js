export default class AppView {
  constructor(itemsVideo) {
    this.itemsVideo = itemsVideo;
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

    console.log('this title appView 1', this.itemsVideo);



    btnInputSearch.onclick = (e) => {
      const input = document.querySelector('.input-search').value;
      e.preventDefault();
      console.log('input', input);
      return input;
    };
  }

  render2() {
    let currentCountVideoOnPage = 10;
    const offsetPage = 0;
    // const bufferPagesIndex = 3;
    const minLengthForSwipe = 150;
    const videoListMini = () => document.querySelector('.content-wrapper');


    console.log('this title appView 2', this.itemsVideo.length);


    const countVideo = () => {
      const screenWidth = document.documentElement.clientWidth;
      currentCountVideoOnPage = 4;
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
    function renderMarkupVideoIdMini(itemsVideo) {
      for (let i = 0; i < currentCountVideoOnPage; i += 1) {
        // console.log('itemsVideo', itemsVideo[i]);
        createVideoMiniItem(itemsVideo[i]);
      }
    }

    renderMarkupVideoIdMini(this.itemsVideo);

    function createVideoMiniItem(item) {
      //       console.log(item);
      const main = document.createElement('main');
      main.className = 'main';
      document.body.appendChild(main);

      const content = document.createElement('section');
      content.className = 'content-wrapper';
      main.appendChild(content);

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
    // ИЗМЕНЕНИЕ КОЛИЧЕСТВА ВИДЕО НА СТРАНИЦЕ В ЗАВИСИМОСТИ ОТ ШИРИНЫ БРАУЗЕРА
    const changeVideoCount = () => {
      const tempCur = currentCountVideoOnPage;
      const newCountVideoOnPage = countVideo();
      const dif = newCountVideoOnPage - tempCur;

      if (dif <= 0) {
        for (let i = 0, len = Math.abs(dif); i < len; i += 1) {
          document.querySelector('.content-wrapper').lastChild.remove();
        }
      } else {
        for (let i = 0; i < dif; i += 1) {
          createVideoMiniItem(this.itemsVideo[tempCur + offsetPage + i], tempCur + i);
        }
      }
    };
    window.addEventListener('resize', changeVideoCount);

    // УДАЛЕНИЕ ВИДЕО СО СТРАНИЦЫ ПОСЛЕ НОВОГО ПОИСКА
    const main = () => document.querySelector('.main');
    const refreshContainer = () => {
      if (main()) {
        main().remove();
      }
      countVideo();
      createVideoMiniItem();
    };

    // создание блоков и заполнение контентом при листании страниц
    const fillPrevNextPage = () => {
      for (let i = offsetPage; i < offsetPage + currentCountVideoOnPage; i += 1) {
        createVideoMiniItem(this.itemsVideo[i], i - offsetPage);
      }
    };

    // следующая страница из кэша
    const nextPage = () => {
      // const remaringPages = this.itemsVideo.length - offsetPage - currentCountVideoOnPage;
      // if (remaringPages < currentCountVideoOnPage * bufferPagesIndex) {
      //   // getYoutubeArrVideoId();
      // }
      refreshContainer();
      offsetPage += currentCountVideoOnPage;
      fillPrevNextPage();
    };

    // предыдущая страница из кэша
    const prevPage = () => {
      refreshContainer();
      offsetPage -= currentCountVideoOnPage;
      fillPrevNextPage();
    };

    // действие при отпускании тача или мыши
    let xDown = null;
    const actionEnd = function mouseOrTouchEndAction(e) {
      // this.itemsVideo.length = 0;
      if (document.getSelection().toString().length > 0) {
        return;
      }
      let xUp = null;
      if (e.type === 'mouseup') {
        xUp = e.clientX;
      } else if (e.type === 'touchend') {
        xUp = e.changedTouches[0].clientX;
      }
      const xDiff = xDown - xUp;
      if (Math.abs(xDiff) > minLengthForSwipe) {
        if (xDiff < 0) {
          if (offsetPage <= 0) {
            return;
          }
          videoListMini().classList.add('-swipe-right');
          setTimeout(prevPage, 500);
        } else {
          if (this.itemsVideo.length === 0) {
            return;
          }
          videoListMini().classList.add('-swipe-left');
          setTimeout(nextPage, 500);
        }
      }
      xDown = null;
    };

    // события по тач свайпу
    document.body.addEventListener('touchstart', (e) => {
      xDown = e.touches[0].clientX;
    });
    document.body.addEventListener('touchend', actionEnd);

    // события по мышь свайпу
    document.body.addEventListener('mousedown', (e) => {
      xDown = e.clientX;
    });
    document.body.addEventListener('mouseup', actionEnd);

    // события по нажатию на стрелки
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevPage();
      }
      if (e.key === 'ArrowRight') {
        nextPage();
      }
    });
  }
}
