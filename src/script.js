let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentTime = new Date();
let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = currentTime.getHours();
{
  if (hour < 10) {
    hour = `0${hour}`;
  }
}
let minutes = currentTime.getMinutes();
{
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
let time = `${hour}:${minutes}`;

function formatDate(now) {
  return `${day}, ${month} ${date}`;
}
function formatTime(now) {
  return `Last updated ${time}`;
}

let updateHeading3 = document.querySelector("h3");
updateHeading3.innerHTML = `${formatDate(currentTime)}`;
let updateHeading4 = document.querySelector("h4");
updateHeading4.innerHTML = `${formatTime(currentTime)}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayWeatherForecast(response) {
  let eachDayForecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let weatherForecastHTML = `<div class="row">`;

  eachDayForecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      weatherForecastHTML =
        weatherForecastHTML +
        `<div class="col-3">
                  <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                    <img
                      src="https://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }.png"
                      width="40"
                      class="forecast-img"
                    />
                      <div class="forecast-temperatures">
                        <span class="forecast-temp-high">${Math.round(
                          forecastDay.temp.max
                        )}°</span>
                        <span class="forecast-temp-low">${Math.round(
                          forecastDay.temp.min
                        )}°</span>
                      </div>
                  </div>`;
    }
  });
  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}

function retrieveForecast(coordinates) {
  let units = "imperial";
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5`;
  let apiUrl = `${apiEndPoint}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayWeatherCondition(response) {
  let displayTemperature = document.querySelector("#currentTemperature");
  let temperature = Math.round(response.data.main.temp);
  let displayCityName = document.querySelector("#weather-location");
  let displayWindSpeed = document.querySelector("#wind");
  let displayHumidity = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  displayTemperature.innerHTML = `${temperature}`;
  displayCityName.innerHTML = response.data.name;
  displayWindSpeed.innerHTML =
    "Wind: " + Math.round(response.data.wind.speed * 2.237) + " mph";
  displayHumidity.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";

  function displayCelsius(event) {
    event.preventDefault();
    let temperatureHeading = document.querySelector("#currentTemperature");
    let windSpeedConversion = document.querySelector("#wind");
    temperatureHeading.innerHTML = Math.round(
      ((`${temperature}` - 32) * 5) / 9
    );
    windSpeedConversion.innerHTML =
      "Wind: " + Math.round(response.data.wind.speed) + " km/h";
    let banner = document.querySelector("#weather-forecast");
    banner.innerHTML =
      "<em><small><q>When witches go riding, and black cats are seen, <br/>the moon laughs and whispers, <br/>tis near Halloween</q></small></em>";
  }

  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureHeading = document.querySelector("#currentTemperature");
    let displayWindSpeed = document.querySelector("#wind");
    temperatureHeading.innerHTML = Math.round(response.data.main.temp);
    displayWindSpeed.innerHTML =
      "Wind: " + Math.round(response.data.wind.speed * 2.237) + " mph";
    retrieveForecast(response.data.coord);
  }

  let celsiusUnitEvent = document.querySelector("#celsius");
  let fahrenheitUnitEvent = document.querySelector("#fahrenheit");
  fahrenheitUnitEvent.addEventListener("click", displayFahrenheit);
  celsiusUnitEvent.addEventListener("click", displayCelsius);

  retrieveForecast(response.data.coord);
}
function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
function searchCityInput(city) {
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#searchbar-form").value;
  searchCityInput(city);
}

let submitButtonEvent = document.querySelector("#submit-button");
submitButtonEvent.addEventListener("click", submitButton);

navigator.geolocation.getCurrentPosition(showCurrentPosition);

searchCityInput("Salem");
