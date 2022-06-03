import { RestCountriesApi } from './js/fetchCountriesApi';
import titleCountry from './templates/title-country.hbs';
import infoOfCounrty from './templates/info-country.hbs';
import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

const restCountriesApi = new RestCountriesApi();

const onSearchCountries = event => {
  restCountriesApi.name = event.target.value.trim().toLowerCase();
  if (restCountriesApi.name === '') {
    listCountry.innerHTML = '';
    return;
  }
  restCountriesApi
    .fetchCountries()
    .then(data => {
      if (restCountriesApi.name === null) {
        return;
      }
      if (data.length > 10) {
        listCountry.innerHTML = '';
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length > 2 && data.length <= 10) {
        listCountry.innerHTML = titleCountry(data);
        classList.add('posts__item');
        return;
      }
      if (data.length === 1) {
        const {
          name: { official },
          flags: { svg },
          capital,
          population,
          languages,
        } = data[0];
        const language = Object.values(languages).join(', ');
        return (listCountry.innerHTML = infoOfCounrty({
          official,
          svg,
          capital,
          population,
          language,
        }));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

input.addEventListener('input', debounce(onSearchCountries, DEBOUNCE_DELAY));
