import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

let page = 1;
const per_page = 40;
const KEY = '28023966-838a4e1daf9ae1f3637aa678a';

async function serverRequest(name, isNewRequest) {
  if (isNewRequest) {
    page = 1;
  }
  const response = await axios.get('/api', {
    params: {
      key: KEY,
      q: `${name}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: per_page,
      page,
    },
  });

  if (!response) {
    return;
  }
  page += 1;
  return response.data;
}

export { serverRequest };

// axios.defaults.baseURL = ‘https://pixabay.com’;

// axios.get(‘/api’, {
//     key: KEY,
//     q: name,
//     …
//   })

// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com';

// export function serverRequest(name) {
//   return axios
//     .get(
//       '/api',
//       {
//         params: {
//           key: '28023966-838a4e1daf9ae1f3637aa678a',
//           q: `${name}`,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,

//         },
//       }
//
//     )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.message);
//       }
//       return response.json();
//     });
// }

//==========
// let per_page = 40;
// let page = 1;

// export function serverRequest(name, isNewRequest) {
//   if (isNewRequest) {
//     page = 1;
//   }
//   return fetch(
//     `https://pixabay.com/api?key=28023966-838a4e1daf9ae1f3637aa678a&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.message);
//     }
//     page += 1;
//     return response.json();
//   });
// }

//========
// 28023966-838a4e1daf9ae1f3637aa678a

// axios
//   .get('/user', {
//     params: {
//       ID: 12345,
//     },
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // виконується завжди
//   });

//======

// import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api';

// let page = 1;
// const per_page = 40;
// const KEY = '28023966-838a4e1daf9ae1f3637aa678a';

// export function serverRequest(name, isNewRequest) {
//   if (isNewRequest) {
//     page = 1;
//   }
//   const searchParams = new URLSearchParams({
//     key: KEY,
//     q: name,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: per_page,
//     page: page,
//   });
//   return axios.get(`?&${searchParams}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.message);
//     }
//     page += 1;
//     console.log(response);
//     return response.json();
//   });
// }
