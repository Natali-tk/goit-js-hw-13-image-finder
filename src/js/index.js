import '../sass/main.scss';
import ImagesApiService from './services/apiService';
import imagesListTpl from '../templates/images-list.hbs';
import getRefs from './get-refs';
const refs = getRefs();
const imagesApiService = new ImagesApiService();
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
    console.log(searchQuery);
    imagesApiService.fetchImages(searchQuery)
        .then(renderImagesList)
        .catch(onFetchError)
        .finally(() => form.reset());
}
const renderImagesList = hits => {
    const markup = imagesListTpl(hits);
    refs.imagesConatiner.insertAdjacentHTML('beforeend', markup);
}

function onFetchError(error) {
    console.log(error);
}