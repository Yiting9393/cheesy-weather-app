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