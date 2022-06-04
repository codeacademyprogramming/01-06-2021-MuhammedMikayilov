import React from "react";
import { Container, Row } from "reactstrap";
import swal from "sweetalert";
import { weatherService } from "../../Service/Weather/index";
import DegreesCKF from "./DegreesCKF";
import FormWeather from "./FormWeather";
import { WeatherApi } from "./Interfaces";
import WeatherCity from "./WeatherCity";

function Weather() {
  const [inputVal, setInputVal] = React.useState("");
  const [weather, setWeather] = React.useState<WeatherApi[]>([]);
  const [rSelected, setRSelected] = React.useState("Celsius");

  const handleChangeWeather = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setInputVal(e.currentTarget.value);
    },
    [setInputVal]
  );

  const handleChangeWeatherDegree = React.useCallback(
    (e) => {
      setRSelected(e.target.textContent);
    },
    [setRSelected]
  );

  const handleRemove = React.useCallback(
    (item: WeatherApi) => {
      setWeather(weather.filter((city) => city.name !== item.name));
    },
    [weather]
  );

  const handleDegree = React.useCallback(
    (temp: number) => {
      switch (rSelected) {
        case "Celsius":
          let celsius = (temp - 273.15).toFixed(2);
          if (Number(celsius) > 0) {
            return "+" + celsius + " C";
          } else {
            return "-" + celsius + " C";
          }
        case "Kelvin":
          if (temp > 0) {
            return "+" + temp + " K";
          } else {
            return "-" + temp + " K";
          }
        default:
          let fahrenheit = (((temp - 273.15) * 9) / 5 + 32).toFixed(3);
          if (Number(fahrenheit) > 0) {
            return "+" + fahrenheit + " F";
          } else {
            return "-" + fahrenheit + " F";
          }
      }
    },
    [rSelected]
  );

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      weatherService
        .getWeathers(inputVal)
        .then((resp: any) => {
          let finded = weather.find(
            (st) => st.name.toLowerCase() === inputVal.toLowerCase()
          );
          let data: WeatherApi = resp.data;

          if (finded === undefined) {
            setWeather([...weather, data]);
          } else {
            swal("OOPS", "This city already exist in your cart", "error");
          }
        })
        .catch((err) => {
          swal("OOPS", "This city is not founded", "error");
        });
      setInputVal("");
    },
    [weather, inputVal]
  );
  return (
    <Container style={{ marginTop: "10%" }}>
      <h1 className="text-center">
        <img
          src="https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-weather-forecast-image_1197280.jpg"
          width="80"
          alt="logo"
          style={{ marginRight: "20px" }}
        />
        Weather App
      </h1>
      <Row>
        <FormWeather
          inputVal={inputVal}
          handleSubmit={handleSubmit}
          handleChangeWeather={handleChangeWeather}
        />
        <DegreesCKF
          handleChangeWeatherDegree={handleChangeWeatherDegree}
          rSelected={rSelected}
          setRSelected={setRSelected}
        />

        {weather.map((city) => (
          <WeatherCity
            key={city.name}
            city={city}
            handleDegree={handleDegree}
            handleRemove={handleRemove}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Weather;
