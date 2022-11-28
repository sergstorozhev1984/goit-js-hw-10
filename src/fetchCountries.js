const BASE_URL = 'https://restcountries.com';

function fetchCountries (name) {
  return fetch(`${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (response.status === 404) {//!responce.ok
        return Promise.reject(new Error());
        //   throw new Error(response.status);
      }
      return response.json();
    }
  );
};

export { fetchCountries };
