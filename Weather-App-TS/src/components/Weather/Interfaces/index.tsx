export interface WeatherApi {
  id: number;
  name: string;
  main: {
    temp: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}
