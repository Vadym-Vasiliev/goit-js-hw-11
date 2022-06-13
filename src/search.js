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
//       //   '/?key=28023966-838a4e1daf9ae1f3637aa678a&q=${name}&image_type=photo&orientation=horizontal&safesearch=true'
//     )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.message);
//       }
//       return response.json();
//     });
// }

export function serverRequest(name) {
  return fetch(
    `https://pixabay.com/api/?key=28023966-838a4e1daf9ae1f3637aa678a&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
}

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
