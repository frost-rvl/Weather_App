import { getWeatherData, formatWeatherData, getCityFromCoords } from "./api.js";
import { renderForecast, renderLoading } from "./ui.js";

export class WeatherApp {
  constructor() {
    this.currentLocation;
    this.forecast = null;
  }

  async fetchForecast() {
    const startTime = new Date().getTime();
    renderLoading();
    try {
      const days = await getWeatherData(this.currentLocation);
      this.forecast = formatWeatherData(days);
    } catch (err) {
      console.log("Error fetching forecast:", err);
    }
    const endTime = new Date().getTime();
    const interval = endTime - startTime;
    if (interval < 1000) {
      setTimeout(1000 - interval);
    }
  }

  async render() {
    if (!this.forecast)
      await this.fetchForecast();
    renderForecast(this.forecast, this.currentLocation);
  }

  async setLocation(newLocation) {
    this.currentLocation = newLocation;
    await this.fetchForecast();
    await this.render();
  }

  async setDefaultLocation() {
    renderLoading();
    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );

        const { latitude, longitude } = position.coords;
        const city = await getCityFromCoords(latitude, longitude);
        this.currentLocation = city;
      } catch (err) {
        console.log("Error fetching location:", err);
        this.currentLocation = "New York";
      }
    } else {
      this.currentLocation = "New York";
    }
    await this.fetchForecast();
    await this.render();
  }

  async init() {
    await this.setDefaultLocation();

    const input = document.querySelector("#search-input");
    const form = document.querySelector("#search-form");
    const error = document.querySelector("#error");

    input.addEventListener("input", () => {
      input.setCustomValidity("");
      error.textContent = "";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if(!input.value.trim()) {
        input.setCustomValidity("Please enter a location");
        error.textContent = input.validationMessage;
        return;
      }

      await this.setLocation(input.value);
    });
  }
}
