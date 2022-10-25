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

// Show current position temperature & temp conversion

function displayWeatherCondition(response) {
  let displayTemperature = document.querySelector("#currentTemperature");
  let temperature = Math.round(response.data.main.temp);
  let displayCityName = document.querySelector("#weather-location");
  let displayWindSpeed = document.querySelector("#wind");
  let displayHumidity = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  displayTemperature.innerHTML = `${temperature}`;
  displayCityName.innerHTML = response.data.name;
  displayWindSpeed.innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " m/s";
  displayHumidity.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";

  function displayCelsius(event) {
    event.preventDefault();
    let temperatureHeading = document.querySelector("#currentTemperature");
    temperatureHeading.innerHTML = Math.round(
      ((`${temperature}` - 32) * 5) / 9
    );
  }

  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureHeading = document.querySelector("#currentTemperature");
    temperatureHeading.innerHTML = Math.round(response.data.main.temp);
  }

  let celsiusUnitEvent = document.querySelector("#celsius");
  let fahrenheitUnitEvent = document.querySelector("#fahrenheit");
  fahrenheitUnitEvent.addEventListener("click", displayFahrenheit);
  celsiusUnitEvent.addEventListener("click", displayCelsius);
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

function displayWeatherForecast() {
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let weatherForecastHTML = `<div class="row">`;
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    weatherForecastHTML =
      weatherForecastHTML +
      `<div class="col-2">
                  <div class="forecast-day">${day}</div>
                    <img
                      src="https://openweathermap.org/img/wn/10d@2x.png"
                      width="50"
                      class="forecast-img"
                    />
                      <div class="forecast-temperatures">
                          <span class="forecast-temp-high">74°</span>
                        <span class="forecast-temp-low">45°</span>
                      </div>
                  </div>`;
  });
  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}

let submitButtonEvent = document.querySelector("#submit-button");
submitButtonEvent.addEventListener("click", submitButton);

navigator.geolocation.getCurrentPosition(showCurrentPosition);

searchCityInput("Salem");
displayWeatherForecast();
