import { serverRequest } from './search';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderCard } from './renderCard';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', getPageAfterClickBtn);

async function renderGallery(isNewRequest, page) {
  page += 1;
  try {
    const text = refs.searchForm.elements.searchQuery.value.trim();

    if (!text) {
      return;
    }
    const response = await serverRequest(text, isNewRequest);

    renderCard(refs.gallery, response);

    let galleryBox = new SimpleLightbox('.gallery a', {});

    Notify.success(`Hooray! We found ${response.totalHits} images.`);
  } catch (error) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onSubmit(event, response) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  renderGallery(true);
  removeHiddenBtn();
}

function getPageAfterClickBtn(response) {
  const totalHits = response.totalHits;
  console.log(totalHits);
  addHiddenBtn();
  renderGallery(false);
}

function addHiddenBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function removeHiddenBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function theEndBtn(response) {
  if (response.total < 0) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }
}

// function checkEndOfSearch() {
//   console.log(newApi.total);
//   if (newApi.total < 0) {
//     Notiflix.Notify.failure(
//       "We're sorry, but you've reached the end of search results."
//     );
//     loadBtnStatus.hidden();
//     observer.disconnect(refs.footer);
//     return;
//   }
// }

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
