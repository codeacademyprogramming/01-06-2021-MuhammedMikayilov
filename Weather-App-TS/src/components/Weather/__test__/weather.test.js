import { render } from "@testing-library/react";
import React from "react";
import Weather from "..";
import { screen } from "@testing-library/dom";
import userEvent, { ITypeOpts } from "@testing-library/user-event";
import WeatherCity from "../WeatherCity";
import { weatherService } from "../../../Service/Weather/index";
import { WeatherApi } from "../Interfaces";
import DegreesCKF from "../DegreesCKF";

describe("Weather app", () => {
  const city = {
    name: "Baku",
    sys: {
      sunrise: 232323232,
    },
  };

  test("should initial render", () => {
    const { getByText } = render(<Weather />);

    expect(getByText("Weather App")).not.toBeUndefined();
    expect(getByText("Add New City")).not.toBeUndefined();
  });

  test("should add new City", () => {
    const { getByLabelText, getByText } = render(<Weather />);
    const { getByTestId } = render(<WeatherCity city={city} />);

    userEvent.type(getByLabelText("Add new City"), "Baku");
    userEvent.click(getByText("Add New City"));

    expect(getByTestId("weatherId").textContent).toEqual(
      expect.stringMatching(/baku/gi)
    );
  });

  // jest.mock("../../../Service/Weather/index");
  // test("should mocking async calls", async () => {
  //   weatherService.getWeathers.mockResolvedValueOnce({ name: "Baku" });
  //   const { getByText, getByLabelText } = render(<Weather />);
  //   const { getByTestId } = render(<WeatherCity city={city} />);

  //   userEvent.type(getByLabelText("Add new City"), "Baku");
  //   userEvent.click(getByText("Add New City"));

  //   expect(getByTestId("weatherId")).not.toBeUndefined();
  //   await waitFor(() => {
  //     expect(getByTestId("weatherId").textContent).toEqual(
  //       expect.stringMatching(/baku/gi)
  //     );
  //   });
  // });
});
