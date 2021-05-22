
const refs = getRefs();
import getRefs from './get-refs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


refs.imagesContainer.addEventListener('click', openModal);
function openModal(event) {
  event.preventDefault(); 
    if (event.target.localName !== 'img') {
        return
    } else {
      const instance = basicLightbox.create(`
      <img src=${event.target.dataset.source} alt="${event.target.alt}">
    `)
      instance.show()
    }
}

