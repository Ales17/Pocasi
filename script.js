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
const placeBtns = document.querySelector(".place-btns");
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

  placeBtns.append(cityBtn);
}
overlayMenuCloseBtn.addEventListener("click", () => toggleMenuVisibility());
menuBtn.addEventListener("click", () => toggleMenuVisibility());

let toggleMenuVisibility = () => overlayMenu.classList.toggle("visible");

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

  //console.log(`TEMP - ${temp}, CODE - ${code}`);
}

async function loadApi(url) {
  const response = await fetch(url);
  let data = await response.json();
  presentToUser(data);
}

window.addEventListener("load", function () {
  loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon));
});
//setInterval(() => loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon)), 10000);

function logSubmit(event) {
  //console.log(event);
  event.preventDefault();
  let inputValue = event.target[0].value;
  getSearchResult(inputValue);
}
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", logSubmit);

async function getSearchResult(searchQuery) {
  const encodedQuery = encodeURI(searchQuery);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=1&language=en&format=json`;
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);
  if (!data.results) {
    alert("Město nenalezeno. Zkuste to znovu");
  } else {
    const r = data.results[0];
    console.log(r);
    currentPlace = {
      lat: r.latitude,
      lon: r.longitude,
      city: r.name,
    };
    loadApi(getApiUrlByCoords(currentPlace.lat, currentPlace.lon));
  }
}

const getSearchResultsJson = async (q) => {
  const encodedQuery = encodeURI(q);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=10&language=en&format=json`;
  const response = await fetch(url);
  let data = await response.json();
  return data.results;
};

const searchResultsDiv = document.querySelector(".search-results");

const setElementAsCurrentPlace = async (e) => {
  const data = e.target.dataset;
  const lon = data.lon;
  const lat = data.lat;
  const reg = data.reg;
  const name = e.target.textContent;

  currentPlace = {
    lat: data.lat,
    lon: data.long,
    city: name,
  };

  await loadApi(getApiUrlByCoords(lat, lon));

  overlayMenuCloseBtn.click();
};

const appendPlaceToResults = (place) => {
  const result = document.createElement("div");
  result.textContent = place.name;
  result.setAttribute("data-lat", place.latitude);
  result.setAttribute("data-lon", place.longitude);
  result.setAttribute("data-reg", place.admin1);
  result.addEventListener("click", setElementAsCurrentPlace);
  searchResultsDiv.appendChild(result);
};

var searchResultsSet = new Set();

const addResultToSet = (r) => {
  searchResultsSet.add(r);
};

const performSearch = async (e) => {
  // Modern way to remove children
  searchResultsDiv.replaceChildren();
  searchResultsSet = new Set();

  const query = e.target.value;
  const results = await getSearchResultsJson(query);

  results.forEach((r) => {
    addResultToSet(r);
  });

  searchResultsSet.forEach((el) => {
    appendPlaceToResults(el);
  });
};

searchForm.addEventListener("keyup", performSearch);

const setSearchResultAsCurrent = (e) => {};
