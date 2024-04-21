const searchCountry = (countries, country) => {
	if (!countries) return null;
	for (let i in countries) {
		if (countries[i].name.toLowerCase() === country.toLowerCase()) {
			return countries[i];
		}
	}
};

export default searchCountry;
