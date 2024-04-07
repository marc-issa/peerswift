const searchCountry = (countries, country) => {
	for (let i in countries) {
		if (countries[i].country_name.toLowerCase() === country.toLowerCase()) {
			return countries[i];
		}
	}
};

export default searchCountry;
