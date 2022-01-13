import React, { useState } from "react";
import useCity from "../../Hooks/useCity";
import useWeather from "../../Hooks/useWeather";
import Search from "../Search/Search";
import HourlyForecast from "../Weather/HourlyForecast";
import Weather from "../Weather/Weather";

//TODO create some test cases
//TODO refractor code
//TODO fix searchTermi
//TODO handle on submit search

const App = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showCityList, setShowCityList] = useState(true);
	const [searchWeather, setSearchWeather] = useState(false);
	const [lat, setLat] = useState(null);
	const [lon, setLon] = useState(null);
	const [selected, setSelected] = useState(0);
	const { cityData, cityIsSuccess } = useCity(searchTerm);
	const { weatherData, weatherError, weatherIsError, weatherIsLoading, weatherIsSuccess } =
		useWeather(lat, lon, searchWeather);
	/*
	 *handle the current value when the user types or searchTermes
	 */
	const handleSearchTerm = ({ target }) => {
		setShowCityList(true);
		setSearchTerm(target.value);
	};

	const search = (lat, lon) => {
		setLat(lat);
		setLon(lon);
		setShowCityList(false);
		setSearchTerm("");
		setSelected(0);
		setSearchWeather(true);
	};

	/*
	 *handle the click event when a user clicks or selects a city from the list
	 *the searchTerm query will be called with the city name and country code of the selected city
	 */

	const handleCityClick = (lat, lon) => {
		setSearchWeather(false);
		search(lat, lon);
	};

	/*
	 *handle submit when the user clicks the searchTerm icon or presses enter
	 *the function sets the isWeather to true to start the searchTerm query
	 *the current state of searchTerm will be sent on click or enter
	 */
	const handleSubmit = e => {
		if (searchTerm.length > 0) {
			e.preventDefault();
			setShowCityList(false);
			setSearchTerm("");
		}
		return null;
	};

	const handleClear = () => {
		setSearchTerm("");
	};

	/*
	 *function to remove the city recommendation list on input blur or out of focus
	 */
	const handleBlur = () => {
		setShowCityList(false);
	};

	const handleFocus = () => {
		setShowCityList(true);
	};

// 	const data = {
// 		labels: ["January", "February", "March", "April", "May", "June", "July"],
// 		datasets: [
// 			{
// 				label: "Dataset of Months",
// 				fill: false,
// 				lineTension: 0.1,
// 				backgroundColor: "rgba(75,192,192,0.4)",
// 				borderColor: "rgba(75,192,192,1)",
// 				borderCapStyle: "butt",
// 				borderDash: [],
// 				borderDashOffset: 0.0,
// 				borderJoinStyle: "miter",
// 				pointBorderColor: "rgba(75,192,192,1)",
// 				pointBackgroundColor: "#fff",
// 				pointBorderWidth: 1,
// 				pointHoverRadius: 5,
// 				pointHoverBackgroundColor: "rgba(75,192,192,1)",
// 				pointHoverBorderColor: "rgba(220,220,220,1)",
// 				pointHoverBorderWidth: 2,
// 				pointRadius: 1,
// 				pointHitRadius: 10,
// 				data: [65, 59, 80, 81, 56, 55, 40],
// 			},
// 		],
// 	};

	return (
		<main>
			<Search
				onChange={handleSearchTerm}
				searchTerm={searchTerm}
				handleSubmit={handleSubmit}
				handleCityClick={handleCityClick}
				data={cityData}
				isSuccess={cityIsSuccess}
				handleClear={handleClear}
				showCityList={showCityList}
				handleBlur={handleBlur}
				handleFocus={handleFocus}
			/>

			<HourlyForecast
				weatherData={weatherData}
				weatherError={weatherError}
				weatherIsError={weatherIsError}
				weatherIsLoading={weatherIsLoading}
				weatherIsSuccess={weatherIsSuccess}
			/>

			<Weather
				weatherData={weatherData}
				weatherError={weatherError}
				weatherIsError={weatherIsError}
				weatherIsLoading={weatherIsLoading}
				weatherIsSuccess={weatherIsSuccess}
				selected={selected}
				setSelected={setSelected}
			/>
		</main>
	);
};

export default App;
