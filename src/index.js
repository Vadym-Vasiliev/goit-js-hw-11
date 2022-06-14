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
refs.loadMoreBtn.setAttribute('hidden', 'hidden');

async function renderGallery(isNewRequest) {
  try {
    const text = refs.searchForm.elements.searchQuery.value.trim();

    if (!text) {
      return;
    }
    const response = await serverRequest(text, isNewRequest);

    renderCard(refs.gallery, response);
    let galleryBox = new SimpleLightbox('.gallery a', {});
  } catch (error) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function setAddAttribute(searchBtn, loadBtn) {
  searchBtn.setAddAttribute('hidden', 'hidden');
  loadBtn.removeAddAttribute('hidden', 'hidden');
}

function getPageAfterClickBtn() {
  renderGallery(false);
}

function onSubmit(event, response) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  renderGallery(true);
}

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.
