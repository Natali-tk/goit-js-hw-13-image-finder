import '../sass/main.scss';
import ImagesApiService from './services/apiService';
import imagesListTpl from '../templates/images-list.hbs';
import getRefs from './get-refs';
import LoadMoreBtn from './components/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
// PNotify.error.remove ();
function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
   imagesApiService.query = form.elements.query.value;
    loadMoreBtn.show();
    imagesApiService.resetPage();
    clearImagesContainer();
    fetchImages();
}
function fetchImages() {
  
  loadMoreBtn.disable();
  imagesApiService.fetchImages()
    .then(hits => {
    renderImagesList(hits);
    loadMoreBtn.enable();
    })
    .catch(error({
       text: 'Sory, not found, please check correction of your request!',
  }));
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



refs.imagesContainer.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', onOverlayClick);
// let activeIndex = null;
function openModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  
    if (event.target.localName !== 'img') {
        return
    } else {
        refs.lightbox.classList.add('is-open');
        refs.imgModal.src = event.target.dataset.source;
        refs.imgModal.alt = event.target.alt;
    }
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.lightbox.classList.remove('is-open');
  refs.imgModal.src = '';
  refs.imgModal.alt = '';
}
function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}