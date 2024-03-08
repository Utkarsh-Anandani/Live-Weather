const getWeather = async (cityN)=>{
	const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityN}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '93214a3518msh165c5c9ffa1b5a7p1f38d9jsn0b7cc9b43c15',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};

	try {
		cityName.innerHTML = cityN;
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
		temp.innerHTML = result.temp;
		max_temp.innerHTML = result.max_temp;
		min_temp.innerHTML = result.min_temp;
		feels_like.innerHTML = result.feels_like;
		cloud_pct.innerHTML = result.cloud_pct;
		humidity.innerHTML = result.humidity;
		wind_speed.innerHTML = result.wind_speed;
		wind_degrees.innerHTML = result.wind_degrees;
		if( result.cloud_pct < 50 ){
			weatherIMG.innerHTML = `<img style="width: 250px;" src="png/sunny.png">`
		}
		else if( result.cloud_pct >= 50 && result.cloud_pct < 75 ){
			weatherIMG.innerHTML = `<img style="width: 250px;" src="png/cloudy sun.png">`
		}
		else if( result.cloud_pct >= 75 && result.cloud_pct < 90 ) {
			weatherIMG.innerHTML = `<img style="width: 250px;" src="png/cloud.png">`
		}
		else {
			weatherIMG.innerHTML = `<img style="width: 250px;" src="png/rainy.png">`
		}
	} catch (error) {
		console.error(error);
	}
}




const getWeatherAll = async (city)=>{
	const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '93214a3518msh165c5c9ffa1b5a7p1f38d9jsn0b7cc9b43c15',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};

	try {
		//cityName.innerHTML = city;
		const response = await fetch(url, options);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}



async function main() {
	const timeNow = new Date().toString();
	getWeather('Delhi');

	dandt.innerHTML = `<p class="nav-link">${timeNow.split("GMT")[0]}</p>`;
	submit.addEventListener("click",(e)=>{
		e.preventDefault();
		getWeather(input.value);
	});

	document.querySelectorAll(".city-click").forEach(async cityElement => {
		let result = await getWeatherAll(cityElement.innerHTML);
		cityElement.parentNode.insertAdjacentHTML("beforeend", `<td>${result.temp}</td>`);
		cityElement.parentNode.insertAdjacentHTML("beforeend", `<td>${result.feels_like}</td>`);
		cityElement.parentNode.insertAdjacentHTML("beforeend", `<td>${result.max_temp}/${result.min_temp}</td>`);
		cityElement.parentNode.insertAdjacentHTML("beforeend", `<td>${result.humidity}</td>`);
	});

	document.querySelectorAll(".city").forEach(cityElement => {
		cityElement.addEventListener("click", (e) => {
			e.preventDefault();
			let city_name = cityElement.firstElementChild.innerHTML;
			getWeather(city_name);
		});
	});	

	document.querySelectorAll(".city-click").forEach(cityElement => {
		cityElement.addEventListener("click", (e) => {
			e.preventDefault();
			let city_name = cityElement.innerHTML;
			getWeather(city_name);
		});
	});	
}

main();

