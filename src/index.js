import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
/*
 - event 'input' for search field +
  - add debounce for event +
   - add method trim() +
 - filtraton input:
	 - if resposnse return more then 10 countries it will show message through notiflix 'Too many matches found. Please enter a more specific name.'
	- if it returs from 2 to 10 it shows list of countries into country-list (flag and name of country)
	- if it is massive with one country it will show the data of one (flag , nameOfCountry, capital, population,languages)
 - Errors:
	- 404 - "Oops, there is no country with that name" - Notiflix.failure(status.ok)
*/

const inputField = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

inputField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))
inputField.placeholder = 'Enter the name of Country'

function onSearch(evt) {
	const input = evt.target;
	const trimInput = input.value.trim()


	if (trimInput === "") {
		removeMarkup(countryList)
		removeMarkup(countryInfo)
		return
	}

	fetchCountries(trimInput).then(data => {

		if (data.length > 10) {
			Notify.info('Too many matches found. Please enter a more specific name.')
			removeMarkup(countryList)
			removeMarkup(countryInfo)
			return
		}
		if (data.length >= 2) {
			removeMarkup(countryInfo)
			return innerMarkup(countryList, createMarkupList(data))
		}

		if (data.length === 1) {
			removeMarkup(countryList)
			return innerMarkup(countryInfo, createMarkupItem(data))
		}
	}).catch(() => {
		removeMarkup(countryList)
		removeMarkup(countryInfo)
		Notify.failure("Oops, there is no country with that name")
	})
}

function innerMarkup(place, markup) {
	return place.innerHTML = markup
}

function removeMarkup(place) {
	return place.innerHTML = ''
}

function createMarkupList(arr) {
	return arr.map((dataCountry) => `<li class ='country-list__info'>
		<img class ='country-list__photo' src="${dataCountry.flags.svg}" alt="${dataCountry.flags.alt}">
		<h1 class ='country-list__title'>${dataCountry.name.official}</h1>
	</li>`).join('')
}

function createMarkupItem([arr]) {
	const { flags: { svg, alt }, name, capital, languages, population } = arr
	return `	
	<div class ="wrapper">
		<div class= "wrapper__heading">
			<img class="country-info__img" src="${svg}" alt="${alt}">
			<h1 class="country-info__title">${name.official}</h1>
		</div>
		<div class= "wrapper__content">
			<ul class="country-info__list">
				<li class="country-info__item">
					<h2 class="country-info__item-heading">Capital: </h2>
					<p class="country-info__item-text">${capital}</p>
				</li>
				<li class="country-info__item">
					<h2 class="country-info__item-heading">Population: </h2>
					<p class="country-info__item-text">${population}</p>
				</li>
				<li class="country-info__item">
					<h2 class="country-info__item-heading">Languages: </h2>
					<p class="country-info__item-text">${Object.values(languages)}</p>
				</li>
			</ul>
		</div>
	</div>`
}