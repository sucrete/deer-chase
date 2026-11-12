// National Weather Service (api.weather.gov) — no API key required.
// Step 1: /points resolves our lat/lon to the local forecast office grid.
// Step 2: fetch the hourly forecast (current conditions) and the 12-hour
//         day/night forecast (daily highs and lows).
const pointsUrl = "https://api.weather.gov/points/38.008,-92.642";
const fetchOptions = { headers: { Accept: "application/geo+json" } };

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

async function getJSON(url) {
  const response = await fetch(url, fetchOptions);
  if (!response.ok) throw new Error(`NWS request failed (${response.status}): ${url}`);
  return response.json();
}

// NWS icon URLs look like:
//   https://api.weather.gov/icons/land/day/rain_showers,40/tsra,60?size=medium
// Pull out the first condition code ("rain_showers") and map it to our icon files.
function nwsIcon(iconUrl) {
  const match = /\/icons\/land\/(?:day|night)\/([^,/?]+)/.exec(iconUrl || "");
  const code = match ? match[1] : "";

  if (code.startsWith("wind_")) return "wind";
  if (["skc", "few", "hot", "cold"].includes(code)) return "sun";
  if (code === "sct") return "part-cloud";
  if (["bkn", "ovc"].includes(code)) return "cloudy";
  if (["fog", "haze", "smoke", "dust"].includes(code)) return "foggy";
  if (/snow|sleet|fzra|blizzard/.test(code)) return "snow";
  if (/rain|tsra|tornado|hurricane|tropical/.test(code)) return "rain";
  return "cloudy";
}

function windMph(windSpeed) {
  // e.g. "10 mph" or "5 to 15 mph" — use the highest number given
  const nums = String(windSpeed || "").match(/\d+/g);
  return nums ? Math.max(...nums.map(Number)) : 0;
}

// startTime is ISO with the local offset ("2026-11-12T18:00:00-06:00"),
// so the date portion is already the local date.
function localDate(isoString) {
  return isoString.slice(0, 10);
}

function dayOfWeek(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return days[new Date(y, m - 1, d).getDay()];
}

// Group 12-hour periods by local date into { date, hi, lo, icon }.
function buildDailyForecast(periods) {
  const byDate = new Map();
  for (const p of periods) {
    const date = localDate(p.startTime);
    if (!byDate.has(date)) byDate.set(date, { date, hi: null, lo: null, icon: null });
    const day = byDate.get(date);
    if (p.isDaytime) {
      day.hi = p.temperature;
      day.icon = nwsIcon(p.icon);
    } else {
      day.lo = p.temperature;
      if (!day.icon) day.icon = nwsIcon(p.icon);
    }
  }
  return [...byDate.values()];
}

async function getWeather() {
  const points = await getJSON(pointsUrl);
  const { forecast, forecastHourly } = points.properties;

  const [hourly, twelveHour] = await Promise.all([
    getJSON(forecastHourly),
    getJSON(forecast),
  ]);

  const now = hourly.properties.periods[0];
  const today = localDate(now.startTime);

  return {
    current: {
      temperature: now.temperature,
      summary: now.shortForecast,
      wind: windMph(now.windSpeed),
      icon: nwsIcon(now.icon),
    },
    // Skip today and keep the next three days
    upcoming: buildDailyForecast(twelveHour.properties.periods)
      .filter((d) => d.date > today)
      .slice(0, 3),
  };
}

function renderFutureRow(rowNumber, dayClass, iconClass, day) {
  if (!day) return;
  const row = document.getElementsByClassName(`future-row-${rowNumber}`)[0];
  document.getElementsByClassName(dayClass)[0].innerHTML = dayOfWeek(day.date);
  document.getElementsByClassName(iconClass)[0].src = `./assets/images/icons/${day.icon}.svg`;
  row.getElementsByClassName("hi")[0].innerHTML = day.hi ?? "--";
  row.getElementsByClassName("lo")[0].innerHTML = day.lo ?? "--";
}

// The footer is a Lit component loaded as a (deferred) module, so on a cold
// first visit its markup may not exist yet when the API responds. Wait for
// the element to be defined and finish its first render before touching it.
async function footerReady() {
  await customElements.whenDefined("my-footer");
  const footer = document.querySelector("my-footer");
  if (footer) await footer.updateComplete;
}

async function populateDOM() {
  // Start the API calls immediately; render once both data and markup are ready.
  const [{ current, upcoming }] = await Promise.all([getWeather(), footerReady()]);

  // Today
  document.getElementsByClassName("icon-img")[0].src = `./assets/images/icons/${current.icon}.png`;
  document.getElementsByClassName("the-temp")[0].innerHTML = Math.round(current.temperature);
  document.getElementsByClassName("what-weather")[0].innerHTML = current.summary;
  document.getElementsByClassName("wind")[0].innerHTML = current.wind;

  // Next three days
  renderFutureRow(1, "tomorrow", "tomorrow-icon", upcoming[0]);
  renderFutureRow(2, "day-after-tomorrow", "day-after-tomorrow-icon", upcoming[1]);
  renderFutureRow(3, "three-days-from-today", "three-days-from-today-icon", upcoming[2]);
}

populateDOM().catch((err) => console.error("Weather widget:", err));
