

import getRefs from './get-refs';
// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
import { Preloader } from './components/preloader';

const refs = getRefs();
const preloader = new Preloader(refs.preloader);

refs.imagesContainer.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', onOverlayClick);
// function openModal(event) {
//   event.preventDefault();
//   if (event.target.localName !== 'img') {
//     return
//   } else {
//     const instance = basicLightbox.create(`
//       <img src=${event.target.dataset.source} alt="${event.target.alt}">
//     `)
//     instance.show();
//   }
// }
function openModal(event) {
  event.preventDefault();
  preloader.show();
  window.addEventListener('keydown', onEscKeyPress);
  
  if (event.target.localName !== 'img') {
    return
  };

  refs.lightbox.classList.add('is-open');
  refs.imgModal.src = event.target.dataset.source;
  refs.imgModal.alt = event.target.alt;
  refs.imgModal.onload = function () {
    preloader.hide();
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

