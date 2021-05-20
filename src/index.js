
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

    celsiusTemperature = response.data.main.temp;

}

function convertToCelsius (event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temperature");
temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

function convertToFahrenheit (event){
event.preventDefault();
let temperatureElement = document.querySelector("#current-temperature");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let celsiusLink = document.querySelector("#Celsius-button");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#Fahrenheit-button");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;

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

function displayForecast(){

    let forecastElement = document.querySelector(".forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    days.forEach(function(day){
        forecastHTML = 
        forecastHTML + `<div class="col-2 forecast">
                <div id="forcast-day">${day}</div>
                <img
                  src="https://openweathermap.org/img/wn/10d@2x.png"
                  alt="forecast-icon"
                  width="80"
                />
                <div id="forecast-temperature"><strong>18°</strong>14°</div>
              </div>`;
            });

        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML =  forecastHTML;
}
displayForecast();