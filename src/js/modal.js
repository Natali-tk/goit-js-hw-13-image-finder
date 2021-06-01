

import getRefs from './get-refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { Preloader } from './components/preloader';

const refs = getRefs();
const preloader = new Preloader(refs.preloader);
refs.imagesContainer.addEventListener('click', openModal);
function openModal(event) {
  event.preventDefault();
  preloader.showLight();
  if (event.target.localName !== 'img') {
    return
  } else {
    const instance = basicLightbox.create(`
      <img src=${event.target.dataset.source} alt="${event.target.alt}">
    `)
    instance.show();
    
    instance.element().isLoad= function () {
      preloader.hide();
    }
  }
}


