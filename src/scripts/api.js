const WEATHER_API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const WEATHER_API_KEY = "NE5WA6JHYU2CRBFFR839B8Y5A";
const MESURE_UNITS = "metric";

const BIG_DATA_CLOUD_API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

async function getWeatherData(location) {
  try {
    const error = document.querySelector("#error");
    const response = await fetch(`${WEATHER_API_URL}/${location}?unitGroup=${MESURE_UNITS}&include=current&key=${WEATHER_API_KEY}&contentType=json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.days;
  } catch (error) {
    console.error(error);
    return [
      {
        datetime: "N/A",
        temp: 0,
        tempmax: 0,
        tempmin: 0,
        conditions: "No data",
        description: "No data",
        icon: "No data"
      }
    ];
  }
}
export { getWeatherData };

function formatWeatherData(days) {
  return days.map((day) => ({
    date: day.datetime,
    maxTemp: day.tempmax,
    temp: day.temp,
    minTemp: day.tempmin,
    conditions: day.conditions,
    description: day.description,
    icon: day.icon,
  }))
}
export { formatWeatherData };

async function getCityFromCoords(lat, lon) {
  const response = await fetch(`${BIG_DATA_CLOUD_API_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.city;
}
export { getCityFromCoords };
