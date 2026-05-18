const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=38.008&longitude=-92.642" +
  "&current=temperature_2m,windspeed_10m,weathercode,is_day" +
  "&daily=weathercode,temperature_2m_max,temperature_2m_min" +
  "&temperature_unit=fahrenheit&windspeed_unit=mph" +
  "&timezone=America%2FChicago&forecast_days=4";

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Rainbow console log
const rainbow = ["#FF0000","#FF7F00","#FFD700","#00CC44","#1E90FF","#6A0DAD","#EE82EE","#FF0000","#FF7F00","#FFD700"];
console.log(
  "Open-Meteo".split("").map(() => "%c%s").join(""),
  ...("Open-Meteo".split("").flatMap((ch, i) => [`color:${rainbow[i]};font-weight:bold;font-size:16px`, ch]))
);

var weatherData;

function wmoToIcon(code, isDay) {
  if (code === 0) return isDay ? "clear-day" : "clear-night";
  if (code <= 2) return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  return "rain";
}

function wmoToSummary(code) {
  const map = {
    0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Foggy", 48: "Icy Fog",
    51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
    56: "Freezing Drizzle", 57: "Heavy Freezing Drizzle",
    61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
    66: "Freezing Rain", 67: "Heavy Freezing Rain",
    71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow", 77: "Snow Grains",
    80: "Showers", 81: "Moderate Showers", 82: "Heavy Showers",
    85: "Snow Showers", 86: "Heavy Snow Showers",
    95: "Thunderstorm", 96: "Thunderstorm w/ Hail", 99: "Thunderstorm w/ Heavy Hail",
  };
  return map[code] ?? "Unknown";
}

function dayOfWeek(dateStr) {
  const [y, m, d] = dateStr.split("T")[0].split("-").map(Number);
  return days[new Date(y, m - 1, d).getDay()];
}

async function getWeather() {
  const response = await fetch(apiUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("Network response was not ok");
  weatherData = await response.json();
  console.log(`%c${dayOfWeek(weatherData.current.time)}`, "color:green");
}

async function populateDOM() {
  await getWeather();

  const weatherIcon = document.getElementsByClassName("icon-img")[0];
  const theTemp    = document.getElementsByClassName("the-temp")[0];
  const weather    = document.getElementsByClassName("what-weather")[0];
  const windSpeed  = document.getElementsByClassName("wind")[0];

  const tomorrowDay         = document.getElementsByClassName("tomorrow")[0];
  const tomorrowWeatherIcon = document.getElementsByClassName("tomorrow-icon")[0];
  const tomorrowHi = document.getElementsByClassName("future-row-1")[0].getElementsByClassName("hi")[0];
  const tomorrowLo = document.getElementsByClassName("future-row-1")[0].getElementsByClassName("lo")[0];

  const dayAfterTomorrowDay  = document.getElementsByClassName("day-after-tomorrow")[0];
  const dayAfterTomorrowIcon = document.getElementsByClassName("day-after-tomorrow-icon")[0];
  const dayAfterTomorrowHi = document.getElementsByClassName("future-row-2")[0].getElementsByClassName("hi")[0];
  const dayAfterTomorrowLo = document.getElementsByClassName("future-row-2")[0].getElementsByClassName("lo")[0];

  const threeDaysFromTodayDay  = document.getElementsByClassName("three-days-from-today")[0];
  const threeDaysFromTodayIcon = document.getElementsByClassName("three-days-from-today-icon")[0];
  const threeDaysFromTodayHi = document.getElementsByClassName("future-row-3")[0].getElementsByClassName("hi")[0];
  const threeDaysFromTodayLo = document.getElementsByClassName("future-row-3")[0].getElementsByClassName("lo")[0];

  const { current, daily } = weatherData;
  const isDay = current.is_day === 1;

  // Today
  weatherIcon.src       = `./assets/images/icons/${assignIcon(wmoToIcon(current.weathercode, isDay))}.png`;
  theTemp.innerHTML     = Math.ceil(current.temperature_2m);
  weather.innerHTML     = wmoToSummary(current.weathercode);
  windSpeed.innerHTML   = Math.ceil(current.windspeed_10m);

  // Tomorrow
  tomorrowDay.innerHTML         = dayOfWeek(daily.time[1]);
  tomorrowWeatherIcon.src       = `./assets/images/icons/${assignIcon(wmoToIcon(daily.weathercode[1], true))}.svg`;
  tomorrowHi.innerHTML          = Math.ceil(daily.temperature_2m_max[1]);
  tomorrowLo.innerHTML          = Math.ceil(daily.temperature_2m_min[1]);

  // Day after tomorrow
  dayAfterTomorrowDay.innerHTML  = dayOfWeek(daily.time[2]);
  dayAfterTomorrowIcon.src       = `./assets/images/icons/${assignIcon(wmoToIcon(daily.weathercode[2], true))}.svg`;
  dayAfterTomorrowHi.innerHTML   = Math.ceil(daily.temperature_2m_max[2]);
  dayAfterTomorrowLo.innerHTML   = Math.ceil(daily.temperature_2m_min[2]);

  // Three days from today
  threeDaysFromTodayDay.innerHTML  = dayOfWeek(daily.time[3]);
  threeDaysFromTodayIcon.src       = `./assets/images/icons/${assignIcon(wmoToIcon(daily.weathercode[3], true))}.svg`;
  threeDaysFromTodayHi.innerHTML   = Math.ceil(daily.temperature_2m_max[3]);
  threeDaysFromTodayLo.innerHTML   = Math.ceil(daily.temperature_2m_min[3]);
}

populateDOM();

const assignIcon = function (icon) {
  if (icon === "clear-day" || icon === "clear-night") return "sun";
  if (icon === "rain") return "rain";
  if (icon === "snow" || icon === "sleet") return "snow";
  if (icon === "wind") return "wind";
  if (icon === "fog") return "foggy";
  if (icon === "cloudy") return "cloudy";
  if (icon === "partly-cloudy-day" || icon === "partly-cloudy-night") return "part-cloud";
};
