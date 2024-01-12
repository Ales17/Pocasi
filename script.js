// Index of selected place for weather
let placeIndex = 0;
// Function to get url based by selected place
function getIndexApiUrl(currentIndex) {
  let lat = places[currentIndex].lat;
  let lon = places[currentIndex].lon;
  return getApiUrlByCoords(lat, lon);
}

function getApiUrlByCoords(lat, lon) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe%2FBerlin`;
}

// HTML catch elements
const divWeather = document.getElementById("div-weather");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
// Display cities in the page
for (let i = 0; i < places.length; i++) {
  let cityBtn = document.createElement("button");
  cityBtn.textContent = places[i].city;
  cityBtn.id = i;
  cityBtn.className = "btn";
  overlay.append(cityBtn);
  cityBtn.addEventListener("click", function (e) {
    placeIndex = e.target.id;
    loadApi(getIndexApiUrl(placeIndex));
    toggleMenuVisibility();
  });
}
closeBtn.addEventListener("click", () => toggleMenuVisibility());
menuBtn.addEventListener("click", () => toggleMenuVisibility());

let toggleMenuVisibility = () =>
  overlay.style.display == "none"
    ? (overlay.style.display = "grid")
    : (overlay.style.display = "none");

function switchCity() {
  placeIndex === places.length - 1 ? (placeIndex = 0) : placeIndex++;
  loadApi(getIndexApiUrl(placeIndex));
}

const tempDiv = document.createElement("div");
tempDiv.id = "temp";
const iconDiv = document.createElement("div");
iconDiv.id = "icon";
const placeDiv = document.createElement("div");
placeDiv.id = "place";
divWeather.append(placeDiv, iconDiv, tempDiv);
// divWeather.addEventListener("click", switchCity);

let getDetails = (weatherCode) =>
  weatherCodes.filter((e) => e.code === weatherCode);

function getWeatherIconElement(iconName, weatherDescription) {
  let iconElement = document.createElement("i");
  iconElement.classList.add("bi", `bi-${iconName}`);
  iconElement.title = weatherDescription;
  return iconElement.outerHTML;
}
 
function getWeatherIconInfo(weatherCode) {
  let weatherDetails = getDetails(weatherCode);
  let iconName = weatherDetails[0].icon;
  let weatherDescription = weatherDetails[0].description;

  return getWeatherIconElement(iconName, weatherDescription);
}

function renderFunkce(apiObject) {
  console.log("RENDERING");
  let temp = apiObject.current_weather.temperature;
  let code = apiObject.current_weather.weathercode;
  const place = places[placeIndex].city;
  console.log(`TEMP - ${temp}, CODE - ${code}`);
  tempDiv.textContent = `${temp} °C`;
  placeDiv.textContent = place;
  iconDiv.innerHTML = getWeatherIconInfo(code);
}

async function loadApi(url) {
  const response = await fetch(url);
  let data = await response.json();
  renderFunkce(data);
}

window.addEventListener("load", function () {
  loadApi(getIndexApiUrl(placeIndex));
});
setInterval(() => loadApi(getIndexApiUrl(placeIndex)), 10000);
