// Selected place info
let currentPlace = {
  lat: places[0].lat,
  lon: places[0].lon,
  city: places[0].city,
};

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
const overlayMenu = document.getElementById("overlay");
const menuBtn = document.getElementById("menu-btn");
const overlayMenuCloseBtn = document.getElementById("close-btn");

// Display cities in the page
for (let i = 0; i < places.length; i++) {
  let cityBtn = document.createElement("button");
  cityBtn.className = "btn";
  cityBtn.textContent = places[i].city;
  cityBtn.id = i;
  
  cityBtn.addEventListener("click", function (e) {
    currentPlace = places[e.target.id];
    loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon));
    toggleMenuVisibility();
  });

  overlayMenu.append(cityBtn);
}
overlayMenuCloseBtn.addEventListener("click", () => toggleMenuVisibility());
menuBtn.addEventListener("click", () => toggleMenuVisibility());

let toggleMenuVisibility = () =>
  overlayMenu.style.display == "none"
    ? (overlayMenu.style.display = "grid")
    : (overlayMenu.style.display = "none");

const tempDiv = document.createElement("div");
tempDiv.id = "temp";

const iconDiv = document.createElement("div");
iconDiv.id = "icon";

const placeDiv = document.createElement("div");
placeDiv.id = "place";
divWeather.append(placeDiv, iconDiv, tempDiv);


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

function presentToUser(apiObject) {
  let temp = apiObject.current_weather.temperature;
  let code = apiObject.current_weather.weathercode;
  const place = currentPlace.city;

  tempDiv.textContent = `${temp} °C`;
  placeDiv.textContent = place;
  iconDiv.innerHTML = getWeatherIconInfo(code);
  
  console.log(`TEMP - ${temp}, CODE - ${code}`);
}

async function loadApi(url) {
  const response = await fetch(url);
  let data = await response.json();
  presentToUser(data);
}

window.addEventListener("load", function () {
  loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon));
});
setInterval(() => loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon)), 10000);
