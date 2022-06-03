import Notiflix from 'notiflix';

export class RestCountriesApi {
  #BASE_URL = 'https://restcountries.com/v3.1';

  constructor() {
    this.name = null;
  }

  fetchCountries() {
    return fetch(
      `${this.#BASE_URL}/name/${
        this.name
      }?fields=flags,name,capital,population,languages`
    ).then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return Notiflix.Notify.failure(
            'Oops, there is no country with that name'
          );
        }
        throw new Error(response.status);
      }

      return response.json();
    });
  }
}
