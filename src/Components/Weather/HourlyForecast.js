import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const HourlyForecast = ({
	weatherData,
	weatherError,
	weatherIsError,
	weatherIsLoading,
	weatherIsSuccess,
}) => {
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		const chart = () => {
			if (weatherIsSuccess && weatherData) {
				const data = weatherData.hourly
					.filter((data, index) => index < 8)
					.map(data => parseInt(data.temp));
				setChartData({
					labels: ["11", "12", "13", "14", "15", "16", "17", "18"],
					datasets: [
						{
							label: "Hourly Forecast",
							fill: false,
							data: data,
							borderColor: "rgba(0,0,0,1)",
							backgroundColor: "rgba(75,192,192,1)",
						},
					],
				});
			}
		};
		chart();
	}, [weatherData, weatherIsSuccess]);

	if (weatherIsError) return <div>{weatherError.message}</div>;
	else if (weatherIsLoading)
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	else if (weatherIsSuccess && weatherData) {
		return (
			<div className="chart">
				<Line>
					data={chartData}
					width={200}
					height={200}
					options=
					{{
						responsive: true,
						scales: {
							yAxes: {
								ticks: {
									beginAtZero: true,
								},
							},
						},
					}}
				</Line>
			</div>
		);
	}

	return null;
};

export default HourlyForecast;
