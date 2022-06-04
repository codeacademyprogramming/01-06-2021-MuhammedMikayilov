import { HttpClient } from "../../HttpClient";

class WeatherService extends HttpClient {
  constructor() {
    super("http://api.openweathermap.org/data/2.5/");
  }

  getWeathers(url: string) {
    return this.get(`weather?q=${url}&appid=16596fe956171a7376f2ba91213e3499`);
  }
}

export const weatherService = new WeatherService();
