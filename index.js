function displayTemperature(response) {
  let weatherDetails = document.querySelector("#weather-details");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let iconElement = document.querySelector(".current-temperature-icon");
  cityElement.classList.add("animation");
  iconElement.classList.add("animation");
  setTimeout(function () {
    cityElement.classList.remove("animation");
    iconElement.classList.remove("animation");
  }, 500);
  if (response.data.city.length > 8) {
    cityElement.style.fontSize = "2.7rem";
  }
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  iconElement.src = response.data.condition.icon_url;
  weatherDetails.innerHTML = `, humidity is <strong>${response.data.temperature.humidity}%</strong> and wind speed is <strong>${response.data.wind.speed}km/h</strong>`;
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000); // we do this to turn miliseconds in our desire time
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `  <div id="daily-forecast">
            <p class="day">${formatDay(day.time)}</p>
            <div>
            <img src="${day.condition.icon_url}" class="forecast-icon">
            </div>
            <span class="weather max">${Math.round(
              day.temperature.maximum
            )}º</span>
            <span class="weather min">${Math.round(
              day.temperature.minimum
            )}º</span>
          </div>`;
  });
  let forecast = document.querySelector(".forecast");
  forecast.innerHTML = forecastHTML;
}
