
import ImagesApiService from './services/apiService';
import imagesListTpl from '../templates/images-list.hbs';
import getRefs from './get-refs';
// import LoadMoreBtn from './components/load-more-btn';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imagesApiService.query = form.elements.query.value;
  if (imagesApiService.query === '') {
    clearImagesContainer();
    return error({
      text: 'Sorry,not found,please check your request!',
      delay: 1500,
      closerHover: true,
    });
  }

  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  // loadMoreBtn.disable();
  return imagesApiService.fetchImages()
    .then(hits => {
     if (hits.length === 0) {
        // loadMoreBtn.hide();
        error({
          text: 'No matches found!',
          delay: 1500,
          closerHover: true,
        });
        // loadMoreBtn.enable();
     } else {
        renderImagesList(hits);
      }
    })
}

function renderImagesList(hits) {
  const markup = imagesListTpl(hits);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  
}

function clearImagesContainer() {
    refs.imagesContainer.innerHTML = '';
}



window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: 'smooth',
});

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.query !== '') {
      fetchImages()
    };
  });
}


const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.sentinel);

