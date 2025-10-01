let apiKey = "tfo33b89af42954f2d60430a801e1b3c";

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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

  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day} ${hours}:${minutes} ${ampm}`;
}

function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let tempElement = document.querySelector(".temp");
  let iconElement = document.querySelector(".temp-icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(response.data.time);
  descriptionElement.innerHTML = response.data.condition.description;

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  tempElement.innerHTML = Math.round(response.data.temperature.current);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" class="weather-icon" />`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form");
  searchCity(searchInput.value);
}
function displayForecast() {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = `<div class="weather-forecast-day">
            <div class="forecast-date">Tue</div>
            <div class="forecast-icon">☀️</div>
            <div class="forecast-temps">
              <div class="forecast-high-low"><strong>15°</strong></div>
              <div class="forecast-high-low">9°</div>
            </div>
          </div>`;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

searchCity("New York");
