export default function getRefs() {
    return {
    searchForm: document.querySelector('.search-form'),
    imagesContainer: document.querySelector('.images-list-root'),
    lightbox: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    content: document.querySelector('.lightbox__content'),
    imgModal: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    };
}