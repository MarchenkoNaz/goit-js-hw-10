import { Notify } from 'notiflix';
const BASE_URL = `https://restcountries.com/v3.1/`;
const FLAG = `/name/`;
export function fetchCountries(name) {

	const url = `${BASE_URL}${FLAG}${name}`
	return fetch(url).then(resp => {
		if (!resp.ok) {
			throw new Error(resp.statusText)
		}
		return resp.json()
	})
}