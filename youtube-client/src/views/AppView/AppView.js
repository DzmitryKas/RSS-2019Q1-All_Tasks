export default class AppView {
  constructor(itemsVideo) {
    this.itemsVideo = itemsVideo;
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

    function createVideoMiniItem(item) {
      function openVideo(id) {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
      }

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
      newTitle.addEventListener('click', () => {
        openVideo(item.id);
      });
      videoMiniItemInfo.appendChild(newTitle);

      const newAuthor = document.createElement('p');
      newAuthor.className = 'author-info';
      newAuthor.textContent = `channel Title: ${item.snippet.channelTitle}`;
      videoMiniItemInfo.appendChild(newAuthor);

      const newViewCount = document.createElement('p');
      newViewCount.className = 'viewCountInfo';
      newViewCount.textContent = `view Count: ${item.statistics.viewCount}`;
      videoMiniItemInfo.appendChild(newViewCount);

      const newDescription = document.createElement('p');
      newDescription.className = 'new-description-info';
      newDescription.textContent = item.snippet.description;
      videoMiniItemInfo.appendChild(newDescription);

      function getPrettyDate(timestamp) {
        const date = new Date(timestamp);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        };
        return date.toLocaleString('ru', options);
      }

      const newPublishedDate = document.createElement('p');
      newPublishedDate.className = 'published-date-info';
      newPublishedDate.textContent = `published Date: ${getPrettyDate(item.snippet.publishedAt)}`;
      videoMiniItemInfo.appendChild(newPublishedDate);
    }

    countVideo();
    function renderMarkupVideoIdMini(itemsVideo) {
      for (let i = 0; i < itemsVideo.length; i += 1) {
        // console.log('itemsVideo', itemsVideo[i]);
        createVideoMiniItem(itemsVideo[i]);
      }
    }

    renderMarkupVideoIdMini(this.itemsVideo);

    const content = document.querySelector('.content-wrapper');
    console.log('content.appendChild2', content.childElement);

    const slider = document.querySelector('.content-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log('pageYOffset', e.pageX);
      console.log('walk', walk);
    });
  }
}
