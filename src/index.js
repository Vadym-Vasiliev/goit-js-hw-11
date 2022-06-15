import { serverRequest } from './search';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderCard } from './renderCard';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

export const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', getPageAfterClickBtn);

let galleryBox = new SimpleLightbox('.gallery a', {});

async function renderGallery(isNewRequest) {
  try {
    const text = refs.searchForm.elements.searchQuery.value.trim();

    if (!text) {
      return;
    }

    const response = await serverRequest(text, isNewRequest, page);
    if (isNewRequest && response.totalHits !== 0) {
      page = 1;
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    renderCard(refs.gallery, response);

    galleryBox.refresh();
    if (response.total === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      addLoadMoreBtn(false);
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  renderGallery(true);
  addLoadMoreBtn(false);
}

function getPageAfterClickBtn() {
  addLoadMoreBtn(false);
  renderGallery(false);
}

// function addHiddenBtn() {
//   refs.loadMoreBtn.classList.add('is-hidden');
//   refs.loadMoreBtn.classList.remove('is-hidden');
// }

function addLoadMoreBtn(flag) {
  if (flag) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
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
