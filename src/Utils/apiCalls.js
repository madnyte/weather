const cityApiKey = process.env.REACT_APP_CITY_API_KEY;
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const api = {
	fetchCities: async city => {
		const response = await fetch(
			`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&offset=0&namePrefix=${city}`,
			{
				method: "GET",
				headers: {
					"x-rapidapi-key": cityApiKey,
					"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
				},
			}
		);
		return response.json();
	},
	fetchWeather: async (lat, lon) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${weatherApiKey}`
		);
		return response.json();
	},
};

export default api;
