import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 700;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}

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
        clearMarkup();
        failureCountryNameNotification();
        });
}

function renderMarkup(items) {
    
    if (items.length === 1) {
        clearMarkup();
        const markupCard = items.map(({ name, capital, population, languages, flags }) => {
            if ((name.official === 'Russian Federation') === true) {
            clearMarkup();
            const russiansGoFuckYourself = items.map(item => `<img class="country-info__russianWarShipGoFuckYourself" src="https://focus.ua/static/storage/thumbs/920x465/0/7f/4d23d296-44e1ffc8a5e771ed6fd21eb8f250a7f0.jpeg" alt="russian warship go Fuck yourself"> <h1 class="country-info__orks">${item.name.official}: is the terrorist state, russian soldiers are fucking orks, russian citizens are weak-willed sheep zombified by putin\'s politic</h1> <img class="country-info__putinHuilo" src="https://kinowar.com/wp-content/uploads/2022/03/Putin-Huilo-%D1%81%D0%BC%D0%B5%D1%80%D1%82%D1%8C-%D0%BF%D1%83%D1%82%D1%96%D0%BD%D1%83.jpg">`);
            Notify.failure('russian\'s go Fuck yourself!!!');
            return refs.countryInfoEl.innerHTML = russiansGoFuckYourself;
        } 
        return `
        <img
        src="${flags.svg}"
        alt="${name.official}"
        width="120"
        height="80">
        <h1 class="country-info__title">${name.official}</h1>
        <ul class="country-info__list">
          <li class="country-info__item">
          <span>Capital:</span>
            ${capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
            ${population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
            ${Object.values(languages)}
          </li>
        </ul>
        `
        });
        return refs.countryInfoEl.innerHTML = markupCard;
        
         
    
    } else {
        clearMarkup();
        const markupList = items.map(({ name, flags }) => {
            if ((name.official === 'Russian Federation') === true) {
                    
                flags.svg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczC3Hp4_jQNrdn4TNJwC8cFYYGcqhFHWE8w&usqp=CAU"
                
                name.official = 'russian federation is the terrorist state, russian soldiers are fucking orks, russian citizens are weak-willed sheep zombified by putin\'s politic!!!'
            }

        return `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        ${name.official}
      </li>`}).join('');
        return refs.countryListEl.innerHTML = markupList;
    }
  
}
// function createMarcupLIst() {
    
// }
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
    Notify.failure("Oops, there is no country with that name");
}