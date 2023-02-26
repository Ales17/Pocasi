const weatherCodes = [
    { "code": 0,   "description": "Jasno" , "icon": "sun-fill" },
    { "code": 1,   "description": "Polojasno" , "icon": "cloud-sun-fill" },
    { "code": 2,   "description": "Oblačno s převahou jasného" , "icon": "cloud-sun-fill" },
    { "code": 3,   "description": "Oblačno" , "icon": "cloud-fill" },
    { "code": 45,   "description": "Mlha s námrazou" , "icon": "thermometer-low" },
    { "code": 48,   "description": "Mlha" , "icon": "cloud-fog-fill" },
    { "code": 51,   "description": "Déšť - slabá intenzita" , "icon": "cloud-rain-fill" },
    { "code": 53,   "description": "Déšť - střední intenzita" , "icon": "cloud-rain-fill" },
    { "code": 55,   "description": "Déšť - silná intenzita" , "icon": "cloud-rain-heavy-fill" },
    { "code": 56,   "description": "Mrznoucí déšť - slabá intenzita" , "icon": "cloud-sleet-fill" },
    { "code": 57,   "description": "Mrznoucí déšť - silná intenzita" , "icon": "cloud-sleet-fill" },
    { "code": 61,   "description": "Déšť - velmi slabá intenzita" , "icon": "cloud-drizzle-fill" },
    { "code": 63,   "description": "Déšť - slabá až střední intenzita" , "icon": "cloud-drizzle-fill" },
    { "code": 65,   "description": "Déšť - střední až silná intenzita" , "icon": "cloud-rain-heavy-fill" },
    { "code": 66,   "description": "Mrznoucí déšť - slabá intenzita" , "icon": "cloud-sleet-fill" },
    { "code": 67,   "description": "Mrznoucí déšť - silná intenzita" , "icon": "cloud-sleet-fill" },
    { "code": 71,   "description": "Sněžení - velmi slabá intenzita" , "icon": "snow-fill" },
    { "code": 73,   "description": "Sněžení - slabá až střední intenzita" , "icon": "snow-fill" },
    { "code": 75,   "description": "Sněžení - střední až silná intenzita" , "icon": "snow-fill" },
    { "code": 77,   "description": "Jemný sníh" , "icon": "snow-fill" },
    { "code": 80,   "description": "Déšť se sněhem - slabá intenzita" , "icon": "cloud-snow-fill" },
    { "code": 81,   "description": "Déšť se sněhem - střední intenzita" , "icon": "cloud-snow-fill" },
    { "code": 82,   "description": "Déšť se sněhem - silná intenzita" , "icon": "cloud-snow-fill" },
    { "code": 85,   "description": "Sněhové přeháňky - slabá intenzita" , "icon": "snow3" },
    { "code": 86,   "description": "Sněhové přeháňky - silná intenzita" , "icon": "snow3" },
    { "code": 95,   "description": "Bouřka - slabá až střední intenzita" , "icon": "lightning" },
    { "code": 96,   "description": "Bouřka s kroupami - slabá intenzita" , "icon": "cloud-hail-fill" },
    { "code": 99,   "description": "Bouřka s kroupami - silná intenzita" , "icon": "cloud-hail-fill" }
  ]

const api_url =
  "https://api.open-meteo.com/v1/forecast?latitude=50.46&longitude=15.38&current_weather=true&timezone=Europe%2FBerlin";
let count = 0;
let divWeather = document.querySelector("#div-weather");

function getIcon(x) {

    let result = weatherCodes.filter((e) => e.code === x);
    let iconName = result[0].icon
    let desc = result[0].description
    let iconElement = document.createElement("i");
    iconElement.classList.add("bi", `bi-${iconName}`);
    iconElement.title = desc;
    return iconElement.outerHTML
     
 }
 

function render(input) {
  let temp = input.current_weather.temperature;
  let code = input.current_weather.weathercode;
  divWeather.innerHTML = `Valdice ${temp} ${getIcon(code)} `
   
  console.log(temp);
  console.log(code);
}


 
 

function getWeatherInfo(x) {
/*   let result = weatherCodes.filter((e) => e.code === x);
  let iconName = result[0].icon
  let desc = result[0].description;
  const weatherIco = document.createElement("i")
  
  weatherIco.className = `bi bi-${iconName}`;
  
  let u = (weatherIco.outerHTML)
  divWeather.innerHTML = u
  console.log(desc)
  console.log(iconName)
  return desc; */



  
 
  return iconElement.outerHTML;
}
async function getWeather(url) {
  const response = await fetch(url);
  var data = await response.json(); 
  render(data);
}

setInterval(function () {
  getWeather(api_url);
}, 10000);

window.addEventListener("load", function () {
  getWeather(api_url);
});
