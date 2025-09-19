import icons from "./icons";

function renderForecast(days, location) {
  renderUI();

  const container = document.querySelector("#weather");
  container.textContent = ""; //Reset container;

  if (days[0].date === "N/A") {
    const messageElement = document.createElement("p");
    messageElement.textContent = "This city doesn't exist or bad network"
    messageElement.id = "message";
    container.append(messageElement);
    return;
  }

  const currentDayElement = renderCurrentCard(days[0], location);

  const listElement = document.createElement("ul");
  listElement.className = "dayList";

  days.slice(1).forEach((day) => {
    const dayElement = renderForecastCard(day);
    listElement.appendChild(dayElement);
  });

  container.append(currentDayElement, listElement);
}
export { renderForecast };

function renderUI(){
  const body = document.body;
  body.textContent = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Weather App";
  body.appendChild(h1);
  const form = document.createElement("form");
  form.id = "search-form";
  form.setAttribute("novalidate", "true");
  body.appendChild(form);

  const divWrapper = document.createElement("div");
  form.appendChild(divWrapper);

  const input = document.createElement("input");
  input.id = "search-input";
  input.type = "text";
  input.placeholder = "Enter a city";
  input.required = true;
  input.autocomplete = "off";
  divWrapper.appendChild(input);

  const button = document.createElement("button");
  button.id = "search-btn";
  button.type = "submit";
  divWrapper.appendChild(button);

  const img = document.createElement("img");
  img.id = "search-icon";
  img.src = icons["search"];
  img.alt = "Search";
  button.appendChild(img);

  const small = document.createElement("small");
  small.id = "error";
  form.appendChild(small);

  const weatherDiv = document.createElement("div");
  weatherDiv.id = "weather";
  body.appendChild(weatherDiv);
}

function renderLoading(){
  const body = document.querySelector("body");
  body.textContent = "";

  const loader = document.createElement("div");
  loader.id = "loader";
  body.appendChild(loader);
}
export { renderLoading };

function renderCurrentCard(day, location) {
  const locationCapitalized = capitalizeFirstLetter(location);

  const currentCard = document.createElement("div");
  currentCard.className = "currentCard";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const iconElement = document.createElement("img");
  iconElement.src = icons[day.icon];
  iconElement.alt = day.conditions;
  iconElement.className = "dayIcon";

  const textGroup = document.createElement("div");
  textGroup.className = "textGroup";
  const locationElement = document.createElement("p");
  locationElement.textContent = locationCapitalized;
  locationElement.className = "location";
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = day.description;
  descriptionElement.className = "dayDescription";

  textGroup.append(locationElement, descriptionElement);
  wrapper.append(iconElement, textGroup);

  const tempRangeWrapper = document.createElement("div");
  tempRangeWrapper.className = "tempRangeWrapper";

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = `${day.temp}°C`;
  temperatureElement.className = "dayTemp";
  const minTempElement = document.createElement("p");
  minTempElement.textContent = `Min: ${day.minTemp}°C`;
  minTempElement.className = "dayMinTemp";
  const maxTempElement = document.createElement("p");
  maxTempElement.textContent = `Max: ${day.maxTemp}°C`;
  maxTempElement.className = "dayMaxTemp";

  tempRangeWrapper.append(temperatureElement, minTempElement, maxTempElement);

  currentCard.append(wrapper, tempRangeWrapper);
  return currentCard;
}

function renderForecastCard(day) {
  const forecastCard = document.createElement("div");
  forecastCard.className = "forecastCard";

  const dateElement = document.createElement("p");
  dateElement.textContent = formatDay(new Date(day.date));
  dateElement.className = "dayDate";

  const iconElement = document.createElement("img");
  iconElement.src = icons[day.icon];
  iconElement.alt = day.conditions;
  iconElement.className = "dayIcon";

  const tempElement = document.createElement("p");
  tempElement.textContent = `${day.temp}°C`;
  tempElement.className = "dayTempMini";

  forecastCard.append(iconElement, tempElement, dateElement);

  return forecastCard;
}

function capitalizeFirstLetter(str){
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function formatDay(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
