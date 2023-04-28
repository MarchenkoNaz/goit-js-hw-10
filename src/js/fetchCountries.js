const BASE_URL = `https://restcountries.com/v3.1/`;
const FLAG = `/name/`;
const END_POINT = `?fields=name,capital,population,flags,languages`
export function fetchCountries(name) {

	const url = `${BASE_URL}${FLAG}${name}${END_POINT}`
	return fetch(url).then(resp => {
		if (!resp.ok) {
			throw new Error(resp.statusText)
		}

		return resp.json()
	})
}