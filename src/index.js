import { serverRequest } from './search';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderCard } from './renderCard';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', renderGallery);

function renderGallery(event) {
  event.preventDefault();

  const text = refs.searchForm.elements.searchQuery.value.trim();

  if (!text) {
    return;
  }
  serverRequest(text)
    .then(response => {
      renderInterface(response);
    })
    .catch(error => {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function renderInterface(response) {
  const markup = renderCard(response);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
  console.log(markup);
}

let galleryBox = new SimpleLightbox('gallery a');
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
