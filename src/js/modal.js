import '../sass/main.scss';
const refs = getRefs();
import ImagesApiService from './services/apiService';
import imagesListTpl from '../templates/images-list.hbs';
import getRefs from './get-refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


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