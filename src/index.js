import { serverRequest } from './search';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      console.log(response);
      renderInterface();
    })
    .catch(error => {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });

  console.log(text);
}

function renderInterface(response) {
  const markup = renderCard(response);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
