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
  return `${day}, <br/>${month} ${date}, ${time}`;
}
let updateH3 = document.querySelector("h3");
updateH3.innerHTML = `${formatDate(currentTime)}`;

// Show current position temperature & temp conversion

function displayWeatherCondition(response) {
  let displayTemperature = document.querySelector("#currentTemperature");
  let temperature = Math.round(response.data.main.temp);
  let displayCityName = document.querySelector("#weather-location");
  let displayWindSpeed = document.querySelector("#wind");
  let displayHumidity = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.setAttribute("src", ``);
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

let submitButtonEvent = document.querySelector("#submit-button");
submitButtonEvent.addEventListener("click", submitButton);

navigator.geolocation.getCurrentPosition(showCurrentPosition);

//let apiKey = "a8040567o3f30d69bbe0b02acftfa14f";
//let apiEndPoint = `https://api.shecodes.io/weather/v1/forecast`;
//let apiUrl = `${apiEndPoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
