const getData = data => {
	const arr = data.hourly;
	const dataSet = [];
	for (let x = 0; arr.length < 8; x++) {
		dataSet.push(arr[x]);
	}
	return dataSet;
};

export default getData;
