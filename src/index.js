import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  const countryName = e.target.value.trim();

  if (!countryName) {
    clearMarkup();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        lessSpecificNameNotification();
        clearMarkup();
        return;
      }

      renderMarkup(data);
    })
    .catch(error => {
      console.log(error);
      clearMarkup();
      failureCountryNameNotification();
    });
}

function renderMarkup(items) {
  if (items.length === 1) {
    clearMarkup();
    console.log(items);
    if (items[0].name.official === 'Russian Federation') {
      console.log('custom markup');
      russiansGoFuckYourselfMarkup(items);
      return;
    }
    console.log('simple markup');
    refs.countryInfoEl.innerHTML = `
        <img class="country-info__img"
        src="${items[0].flags.svg}"
        alt="${items[0].name.official}"
        width="120"
        height="80">
        <h1 class="country-info__title">${items[0].name.official}</h1>
        <ul class="country-info__list">
          <li class="country-info__item">
          Capital:${items[0].capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
            ${items[0].population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
            ${Object.values(items[0].languages)}
          </li>
        </ul>
        `;
  } else {
    clearMarkup();
    const markupList = items
      .map(({ name, flags }) => {
        if ((name.official === 'Russian Federation') === true) {
          flags.svg =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczC3Hp4_jQNrdn4TNJwC8cFYYGcqhFHWE8w&usqp=CAU';

          name.official =
            "russian federation is the terrorist state, russian soldiers are fucking orks, russian citizens are weak-willed sheep zombified by putin's politic!!!";
        }

        return `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        <p class="country-list__text">${name.official}</p>
      </li>`;
      })
      .join('');
    return (refs.countryListEl.innerHTML = markupList);
  }
}
// function createMarcupLIst() {

// }
function russiansGoFuckYourselfMarkup(items) {
  const russiansGoFuckYourself = items
    .map(
      item =>
        `<img class="country-info__russianWarShipGoFuckYourself" src="https://focus.ua/static/storage/thumbs/920x465/0/7f/4d23d296-44e1ffc8a5e771ed6fd21eb8f250a7f0.jpeg" alt="russian warship go Fuck yourself"> <h1 class="country-info__orks">${item.name.official}: is the terrorist state, russian soldiers are fucking orks, russian citizens are weak-willed sheep zombified by putin\'s politic</h1> <img class="country-info__putinHuilo" src="https://kinowar.com/wp-content/uploads/2022/03/Putin-Huilo-%D1%81%D0%BC%D0%B5%D1%80%D1%82%D1%8C-%D0%BF%D1%83%D1%82%D1%96%D0%BD%D1%83.jpg">`
    )
    .join('');
  Notify.failure("russian's go Fuck yourself!!!");
  // console.log(russiansGoFuckYourself);
  refs.countryInfoEl.innerHTML = russiansGoFuckYourself;
}
// function createMarcuCard() {

// }

function clearMarkup() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}
function lessSpecificNameNotification() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}
function failureCountryNameNotification() {
  Notify.failure('Oops, there is no country with that name');
}
