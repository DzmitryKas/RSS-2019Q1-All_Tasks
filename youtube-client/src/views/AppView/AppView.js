/* eslint-disable prefer-destructuring */
export default class AppView {
  constructor(itemsVideo) {
    this.itemsVideo = itemsVideo;
  }

  render() {
    let count1 = 0;

    function createVideoiItem(item) {
      function openVideo(id) {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
      }

      const section = document.querySelector('.content-wrapper');
      const box = document.createElement('div');
      box.className = 'box';
      section.appendChild(box);

      const videoItemImg = document.createElement('div');
      videoItemImg.className = 'block-video-item-img';
      box.appendChild(videoItemImg);

      const videoItemInfo = document.createElement('div');
      videoItemInfo.className = 'block-video-item-info';
      box.appendChild(videoItemInfo);

      const newImg = document.createElement('img');
      newImg.className = 'video-img';
      newImg.src = item.snippet.thumbnails.medium.url;
      videoItemImg.appendChild(newImg);

      const newTitle = document.createElement('h3');
      newTitle.className = 'title-info';
      newTitle.textContent = item.snippet.title;
      newTitle.addEventListener('click', () => {
        openVideo(item.id);
      });
      videoItemInfo.appendChild(newTitle);

      const newAuthor = document.createElement('p');
      newAuthor.className = 'author-info';
      newAuthor.textContent = `channel Title: ${item.snippet.channelTitle}`;
      videoItemInfo.appendChild(newAuthor);

      const newViewCount = document.createElement('p');
      newViewCount.className = 'viewCountInfo';
      newViewCount.textContent = `view Count: ${item.statistics.viewCount}`;
      videoItemInfo.appendChild(newViewCount);

      const newDescription = document.createElement('p');
      newDescription.className = 'new-description-info';
      newDescription.textContent = item.snippet.description;
      videoItemInfo.appendChild(newDescription);

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
      videoItemInfo.appendChild(newPublishedDate);

      const countVideo = () => {
        if (count1 < 1) {
          const screenWidth = document.documentElement.clientWidth;
          const content = document.querySelector('.content-wrapper');
          if (screenWidth > 1328) {
            const margin = (content.offsetWidth - (4 * 322)) / 8;
            box.style.marginRight = `${margin}px`;
            box.style.marginLeft = `${margin}px`;
          }

          if (screenWidth <= 1328 && screenWidth > 992) {
            const margin3Cards = (content.offsetWidth - (3 * 322)) / 6;
            box.style.marginRight = `${margin3Cards}px`;
            box.style.marginLeft = `${margin3Cards}px`;
          }

          if (screenWidth <= 992 && screenWidth > 650) {
            const margin2Cards = (content.offsetWidth - (2 * 322)) / 4;
            box.style.marginRight = `${margin2Cards}px`;
            box.style.marginLeft = `${margin2Cards}px`;
          }

          if (screenWidth <= 650) {
            const margin1Cards = (content.offsetWidth - 322) / 2;
            box.style.marginRight = `${margin1Cards}px`;
            box.style.marginLeft = `${margin1Cards}px`;
          }
        }
      };
      countVideo();
    }

    function renderMarkupVideoId(item) {
      for (let i = 0; i < item.length; i += 1) {
        createVideoiItem(item[i]);
      }
    }
    renderMarkupVideoId(this.itemsVideo);
    count1 += 1;

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
    slider.addEventListener('mouseup', (e) => {
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      if (walk > 0) {
        slider.scrollLeft -= slider.offsetWidth;
        isDown = false;
        slider.classList.remove('active');
      } else {
        slider.scrollLeft += slider.offsetWidth;
        isDown = false;
        slider.classList.remove('active');
      }
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('touchend', (e) => {
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      if (walk > 0) {
        slider.scrollLeft -= slider.offsetWidth;
        isDown = false;
        slider.classList.remove('active');
      } else {
        slider.scrollLeft += slider.offsetWidth;
        isDown = false;
        slider.classList.remove('active');
      }
    });
    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });

    const buttonPrev = document.querySelector('.button-prev');
    const buttonNext = document.querySelector('.button-next');

    buttonNext.onclick = () => {
      slider.scrollLeft += slider.offsetWidth;
    };

    buttonPrev.onclick = () => {
      slider.scrollLeft -= slider.offsetWidth;
    };
  }
}
