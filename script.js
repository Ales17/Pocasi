// Index of selected place for weather
let placeIndex = 0;
// Function to get url based by selected place
function getApiUrl(currentIndex) {
  let lat = places[currentIndex].lat;
  let lon = places[currentIndex].lon;
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe%2FBerlin`;
}
// HTML catch elements
const divWeather = document.querySelector("#div-weather");

// Display cities in the page
/* for (let i = 0; i < places.length; i++) {
  let cityBtn = document.createElement("button");
  cityBtn.textContent = places[i].city;
  cityBtn.id = i;
  cityBtn.className = "city";
  citiesDiv.append(cityBtn);
  cityBtn.addEventListener("click", function (e) {
    placeIndex = e.target.id;
    loadApi(getApiUrl());
  });
} */

function switchCity() {
  placeIndex === places.length - 1 ? (placeIndex = 0) : placeIndex++;
  loadApi(getApiUrl(placeIndex));
}

const tempDiv = document.createElement("div");
tempDiv.id = "temp";
const iconDiv = document.createElement("div");
iconDiv.id = "icon";
const placeDiv = document.createElement("div");
placeDiv.id = "place";
divWeather.append(placeDiv, iconDiv, tempDiv);
divWeather.addEventListener("click", switchCity);

let getDetails = (weatherCode) =>
  weatherCodes.filter((e) => e.code === weatherCode);

// Function - return icon element
function getIcon(weatherCode) {
  let weatherDetails = getDetails(weatherCode);
  let iconName = weatherDetails[0].icon;
  let desc = weatherDetails[0].description;
  let iconElement = document.createElement("i");
  iconElement.classList.add("bi", `bi-${iconName}`);
  iconElement.title = desc;
  return iconElement.outerHTML;
}

function renderFunkce(apiObject) {
  let temp = apiObject.current_weather.temperature;
  let code = apiObject.current_weather.weathercode;
  const place = places[placeIndex].city;
  tempDiv.textContent = `${temp} °C`;
  placeDiv.textContent = place;
  iconDiv.innerHTML = getIcon(code);
}

async function loadApi(url) {
  const response = await fetch(url);
  let data = await response.json();
  renderFunkce(data);
}

window.addEventListener("load", function () {
  loadApi(getApiUrl(placeIndex));
});
setInterval(() => loadApi(getApiUrl(placeIndex)), 10000);
