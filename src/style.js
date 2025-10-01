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
  getForecast(response.data.city);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "tfo33b89af42954f2d60430a801e1b3c";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiURL).then(displayForecast);
}
function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="forecast-date">${formatDay(day.time)}</div> 
            <div class="forecast-icon">
            <img src="${day.condition.icon_url}" class="forecast-icon"/>
            </div>
            <div class="forecast-temps">
              <div class="forecast-high-low"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="forecast-high-low">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

searchCity("New York");
getForecast("New York");
