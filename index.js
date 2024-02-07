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
  weatherDetails.innerHTML = `Humidity is <strong>${response.data.temperature.humidity}%</strong> and wind speed is <strong>${response.data.wind.speed}km/h</strong>`;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
