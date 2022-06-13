export function renderCard(response) {
  console.log(response);
  return response.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <a class="link" href="${largeImageURL}">
  <img src="${webformatURL}" class="img" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
     <b>Likes</b><br>
      <b class="bold-text">${likes}</b>
    </p>
    <p class="info-item">
     <b>Views</b><br>
      <b class="bold-text"> ${views}</b>
    </p>
    <p class="info-item">
     <b>Comments</b><br>
      <b class="bold-text"> ${comments}</b>
    </p>
    <p class="info-item">
     <b>Downloads</b><br>
      <b class="bold-text"> ${downloads}</b>
    </p>
  </div>
  </a>
  
</div>
`
    )
    .join('');
}
