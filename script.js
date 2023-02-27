const weatherCodes = [
  { code: 0, description: "Jasno", icon: "sun-fill" },
  { code: 1, description: "Polojasno", icon: "cloud-sun-fill" },
  {
    code: 2,
    description: "Oblačno s převahou jasného",
    icon: "cloud-sun-fill",
  },
  { code: 3, description: "Oblačno", icon: "cloud-fill" },
  { code: 45, description: "Mlha s námrazou", icon: "thermometer-low" },
  { code: 48, description: "Mlha", icon: "cloud-fog-fill" },
  { code: 51, description: "Déšť - slabá intenzita", icon: "cloud-rain-fill" },
  {
    code: 53,
    description: "Déšť - střední intenzita",
    icon: "cloud-rain-fill",
  },
  {
    code: 55,
    description: "Déšť - silná intenzita",
    icon: "cloud-rain-heavy-fill",
  },
  {
    code: 56,
    description: "Mrznoucí déšť - slabá intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 57,
    description: "Mrznoucí déšť - silná intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 61,
    description: "Déšť - velmi slabá intenzita",
    icon: "cloud-drizzle-fill",
  },
  {
    code: 63,
    description: "Déšť - slabá až střední intenzita",
    icon: "cloud-drizzle-fill",
  },
  {
    code: 65,
    description: "Déšť - střední až silná intenzita",
    icon: "cloud-rain-heavy-fill",
  },
  {
    code: 66,
    description: "Mrznoucí déšť - slabá intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 67,
    description: "Mrznoucí déšť - silná intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 71,
    description: "Sněžení - velmi slabá intenzita",
    icon: "snow-fill",
  },
  {
    code: 73,
    description: "Sněžení - slabá až střední intenzita",
    icon: "snow-fill",
  },
  {
    code: 75,
    description: "Sněžení - střední až silná intenzita",
    icon: "snow-fill",
  },
  { code: 77, description: "Jemný sníh", icon: "snow-fill" },
  {
    code: 80,
    description: "Déšť se sněhem - slabá intenzita",
    icon: "cloud-snow-fill",
  },
  {
    code: 81,
    description: "Déšť se sněhem - střední intenzita",
    icon: "cloud-snow-fill",
  },
  {
    code: 82,
    description: "Déšť se sněhem - silná intenzita",
    icon: "cloud-snow-fill",
  },
  {
    code: 85,
    description: "Sněhové přeháňky - slabá intenzita",
    icon: "snow3",
  },
  {
    code: 86,
    description: "Sněhové přeháňky - silná intenzita",
    icon: "snow3",
  },
  {
    code: 95,
    description: "Bouřka - slabá až střední intenzita",
    icon: "lightning",
  },
  {
    code: 96,
    description: "Bouřka s kroupami - slabá intenzita",
    icon: "cloud-hail-fill",
  },
  {
    code: 99,
    description: "Bouřka s kroupami - silná intenzita",
    icon: "cloud-hail-fill",
  },
];

const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=50.46&longitude=15.38&current_weather=true&timezone=Europe%2FBerlin";

// HTML "catch" element
let divWeather = document.querySelector("#div-weather");
// Widget Structure
const tempDiv = document.createElement("div");
const iconDiv = document.createElement("div");
const placeDiv = document.createElement("div");
divWeather.append(placeDiv, iconDiv, tempDiv);

// Returns an array with one object containing code, description and icon
/* function getDetails(weatherCode) {
  return weatherCodes.filter((e) => e.code === weatherCode);
} */

let getDetails = (weatherCode) =>
  weatherCodes.filter((e) => e.code === weatherCode);

// Function - return icon element
function getIcon(weatherCode) {
  // Filter array with the codes
  let object = getDetails(weatherCode);

  // Get icon name for Bootstrap and description (title)
  let iconName = object[0].icon;
  let desc = object[0].description;
  // Create element, set classes and title
  let iconElement = document.createElement("i");
  iconElement.classList.add("bi", `bi-${iconName}`);
  iconElement.title = desc;
  return iconElement.outerHTML;
}

function render(loadedApi) {
  let temp = loadedApi.current_weather.temperature;
  let code = loadedApi.current_weather.weathercode;
  const place = "Valdice";
  tempDiv.textContent = temp;
  placeDiv.textContent = place;
  iconDiv.innerHTML = getIcon(code);
}

async function loadApi(url) {
  const response = await fetch(url);
  let data = await response.json();
  render(data);
  console.log("load")
}

setInterval(  () =>  loadApi(api_url), 1000);

window.addEventListener("load", function () {
  loadApi(api_url);
});
