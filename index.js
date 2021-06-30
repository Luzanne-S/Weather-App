//date//
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let changeTime = document.querySelector(".date");

  return `${day} ${hours}:${minutes}`;
}

//city//
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "4ad046b76be74520a0cad560d5d143a8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature).then(formatDate);
}
let cityInput = document.querySelector(".searchBar");
cityInput.addEventListener("submit", searchCity);

//temperature//

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(celsiusTemperature);

  temperatureElement.innerHTML = temperature;

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElemement.setAttribute("alt", response.data.weather[0].description);
}

//converting units//
let celsiusTemperature = null;

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
