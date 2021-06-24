function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "4ad046b76be74520a0cad560d5d143a8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let cityInput = document.querySelector(".searchBar");
cityInput.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}
