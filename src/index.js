
function formatDate (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatForecastDay (timestamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response){
let forecast = response.data.daily;

console.log(response.data);

    let forecastElement = document.querySelector(".forecast");
    let forecastHTML = `<div class="row">`;
   
    forecast.forEach(function(forecastDay, index){
        if (index < 6) {
        forecastHTML = 
        forecastHTML + `<div class="col-2 forecast">
                <div id="forcast-day">${formatForecastDay(forecastDay.dt)}</div>
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt="forecast-icon"
                  width="80"
                />
                <div id="forecast-temperature"><strong>${Math.round(forecastDay.temp.max)}° </strong>${Math.round(forecastDay.temp.min)}°</div>
              </div>`;
              }
            });

        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML =  forecastHTML;
}

function getForecast(coordinates){
    let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response){
    console.log(response.data);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.name;
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let weatherDescriptionElement = document.querySelector("#weather-description");
    weatherDescriptionElement.innerHTML = response.data.weather[0].description;
    let feelsLikeElement = document.querySelector("#feels-like");
    feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.main.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed} mph`;
    let iconElement = document.querySelector("#weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    celsiusTemperature = response.data.main.temp;
    feelsLikeCelsiusTemperature = response.data.main.feels_like;
    getForecast(response.data.coord);
}

function convertToCelsius (event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temperature");
temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
let feelsLikeElement = document.querySelector("#feels-like");
feelsLikeElement.innerHTML = `${Math.round(feelsLikeCelsiusTemperature)}°`;
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}

function convertToFahrenheit (event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temperature");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
let feelsLikeElement = document.querySelector("#feels-like");
feelsLikeTemperature = (feelsLikeCelsiusTemperature * 9) / 5 + 32;
feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemperature)}°`
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
}

let celsiusLink = document.querySelector("#Celsius-button");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#Fahrenheit-button");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;
let feelsLikeCelsiusTemperature = null;

function search(city){
let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityElement = document.querySelector("#search-input");
    search(cityElement.value);
}

search("London");

let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

function showPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
let apiKey = `bf2c0ac77d7ed4ba5477597b0389d74a`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
console.log(apiUrl);  
axios.get(apiUrl).then(displayTemperature); 
}

function retrieveCoordinates(response){
response.preventDefault;
navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationSearch = document.querySelector("#my-location-button");
myLocationSearch.addEventListener("click", retrieveCoordinates);