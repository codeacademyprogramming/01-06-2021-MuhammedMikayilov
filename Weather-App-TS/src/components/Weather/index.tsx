import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import swal from "sweetalert";
import { weatherService } from "../../Service/Weather/index";
import { WeatherApi } from "./Interfaces";

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
      let response = await weatherService.getWeathers(inputVal);
      let result: WeatherApi = await response.data;
      if (response.status >= 200 && response.status < 300) {
        let finded = weather.find(
          (st) => st.name.toLowerCase() === inputVal.toLowerCase()
        );

        if (finded === undefined) {
          setWeather([...weather, result]);
        } else {
          swal("OOPS", "This city already exist in your cart", "error");
        }

        setInputVal("");
      } else swal("NOT FOUND", "We cannot found this city", "error");
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
        <Col sm="10">
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="addCity" style={{ color: "#fff" }}>
              Add new City
            </Label>
            <br />
            <Input
              id="addCity"
              placeholder={"write city"}
              style={{
                width: "80%",
                display: "inline-block",
                marginRight: "20px",
              }}
              onChange={handleChangeWeather}
              value={inputVal}
            />
            <Button className="btn-success">Add New City</Button>
          </Form>
        </Col>
        <Col sm="2" className="mt-4">
          <ButtonGroup>
            <Button
              color="primary"
              onClick={handleChangeWeatherDegree}
              active={rSelected === "Celsius"}
            >
              Celsius
            </Button>
            <Button
              color="primary"
              onClick={() => setRSelected("Kelvin")}
              active={rSelected === "Kelvin"}
            >
              Kelvin
            </Button>
            <Button
              color="primary"
              onClick={() => setRSelected("Fahrenheit")}
              active={rSelected === "Fahrenheit"}
            >
              Fahrenheit
            </Button>
          </ButtonGroup>
        </Col>

        {weather.map((city) => (
          <Col sm="3" key={city.name} className="mt-5">
            <Card>
              <CardImg
                top
                width="100%"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhAQEA8SEBASEhoTEhgSEhgVFhkWFRYXFhYVFxUYHSggGBoqGxUVIjEhJjUrLi4uGh8zODMsNygtLisBCgoKDg0OGxAQGi0mICYvLy8rLS0tLS8tLy0vLS0tLS0rLS0tLS0tLS4tLi8tLS0tLS0rNS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgMBBAYFB//EADwQAAIBAwICBgcGBQQDAAAAAAABAgMREgQhBTEGE0FRYXEiMlOBkaHRFBVCUpOxI3KCksEHYqLwY+Hx/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA2EQACAgECBAMGBAQHAAAAAAAAAQIRAyExBBJBUQVhcROBkcHR8CIyobEUFSNSBiRCcqLh8f/aAAwDAQACEQMRAD8A4IE8RidazVsgCeIxFiyAPc4f0enW0uq1a9Wg42X5lzqv+mLi/ieNiUjkjJtJ6p0/Wr+f3RLTVX1IAniMS9kWQBPEYixZAE8RiLFkATxGIsWQBPEYixZAE8RiLFkATxGIsWQBPEYixZAE8RiLFkATxGIsWQBPEYixZAE8RiLFkATxPY4J0X1OsTlRprBOznOWMb9y7W/JEOSSthaniA6vS9AtXKuqNSKpwtk6t84Yqy2tzld+q7P3HUVf9MdPjaOorKpbZywcb/yqKdveY5ZoLqWUWz5YD0OL8KqaWrOhVSyj2rlJPdSi+5mliZLsqQBPEYk2LLcRiW4jEggpcD6PoOFaXiempONKMNXhatUh6OMk8c5xjtOUsbpPd96OX6N8M01eeOp1a06vtG1nLyqS9GPvPqXRnh1LT06lOirR66T53e1krvt2SOL4rxUcdKNqadp6pU9/KS8tV0fVG1w2Ny3qmY4Z0dhp6H2eFat1dmnfq/xXcvwb83zueBR6IaLQuVXUp1qK3jKq9obepUgrRld8pPZtpWTtfuDT4zSjPT6iE/VlRmpeWL3OFj4rKm1zOpfmrRv39/rTN2WKNbbbHwvXV3WqVKrio5yclFJJRTe0Ul2JWXuNfE7DpXwDR6dXo6u1WyfUv+I725ZR3h/V8TlMT2PD5oZYKUE0tlarb9/VWjlTg4umVYjEtxGJmKlWIxLcRiAVYjEtxGIBViMS3EYgFWIxLoU3JqMU5SfJJNt+SXM9nS9E9ZVs1p5RT7ajUPlJ3+Rjy5seJXkko+rS/cmMZS/KrPAxGJ18egGrfOdCPnOT/aBifQHVLlOhLynL/MDT/mvBXXtY/f6Gb+Gzf2s5HEYnu6rotq6V29PKSXbTan8otv5HjyhZtNNNc09mvNG5iy48qvHJSXk0/wBjFKEo/mVepViMS3EYmQqVYjEtxGIBViMS3EYgFWIxLcRiAbXA+D1NZWjQpuKbTk3Lkorm3bd80vefaOC6D7Np6NDZunTUW0rJy/FK3jK7958X4brqmnqRq0Z4TjyfNWfNNPZo6jRdPtQs+uafo+h1dNc9+e/kYMuOc3SaovGagrafuPppk+WaTppxCrJQg6Tk/wDxrs5tsjDp3rVJKbhZS9JdUk7J7rz5mD+GmX9tG6O94z0a0urlnXpuU1DBSU5RaSbatZ2e8nzTPjvFtD1FatRyy6upKCfek9n52Op4h081LlJUZqMLWTnTjle27XM5Gbcm5SbcpNttu7bbu232u5sYoTjabMbmpJNL4lOIxLcRiZipZiMS3EYkEFWJ9N6HUpaLRwrVZfwav8Wa9nltGa74uKi2ua8d7fN8TZ1msq1mnVqSqW9XJ7LstGPKK8jU4vh5cRFY7qN2+/lX17pbqzLiyKD5q16H2ilxCjOOca1OUe9Ti18bnm6ytHX062n09ZYNOFWpFppXXqR773V3ySb7eXFcE4/GjotRSaj10Xag2le1W+Vv5XlL3o5mhUlTalTnKElycZOLXvW5yMXhEuaf4qcX+FtWn1uvvW96NqfFKlputSipRcHKMljKLcZLuadmviRxNrUVZVJSnOWU5O8n3vvdu0qxPRW3q9/v5mgVYjEtxGIBViMS3EYgFWIxLcT3uBdEtTq0pxSp0nynUuk/5Ut5efLxIcklbJSbOehTbaSTbbskldtvkklzZ2nAugcpWnq5Omuapwfpf1S5R8ld+KOt6N9EKWjWWXW1nzm42su6EbvHxfN/I9qdBrxOB4nxvGpOPDwaj1kqbfotWl51fobuDDj3m9e31e331PO4fwyjp1jRpRprtst35ye795ssyYZ42UnN80nbfV6t+86qVKkRZhmWYZJdEGaPEeGUdQrVqUZ9za9JeUlujeZhkxk4y5oun3Wj+Jak1TPn3G+hU4Xnpm6kebhL11/K+UvLZ+Zybha6as1s09mmuxo+1HP9I+jsNSnOFoV0tn2St2S+p6Xw7x6Sax8U7X93Vf7q39Vr5Pdc7iPD01zYvh9Pp+3X5piMTYrUJQlKE04yi7ST5pkMT1ZyCrEYluIxAKsRiW4jEAqxNzh9GlLrOtnjan6H83+fLxKMTa0WglVzxt6Ect+3uXyZMd9CmRrlduvP3mvpa06clKm3GXJW359lu0jFZSWTayl6T5vd7vx7WbPD9T1U1UxU7X2btzXNPvK8XOWyScpbJclk9l5bjoT/AKnp03+XuM8SpU41JKjLKG1u3s3V+01MTd12jdKbg2nbe67UzXxEtxBrlVO/PuVYixbiMSCxdiMS7EYgFOIxLsRiAU4jEuxGIBTiMS7EYgFOJu8H4TU1VWNGkld7tvlGK5yfhuviijE+kf6b6JQ086tvSq1Gr/7YbJfFyfvMeSfJGy0FzOja4X0K0lFLOn9on2yq7r3Q9VL4vxNvVdFdFUVnpaUfGnHq38YWPZBo88ruzZ5V2OE0v+n8YamLlPrNIllaXrOSatTkls123XO1rI7pK2yVktlYyBKbluRGKWwABUsa+qp/iXvNVnozjdNGs9J/u+R57xHw3JPNz4Y3er1S197W+/rZu4M8VGpM1WYJVINbMiziNNNp7m4neqIMiyTIsqZERZFkmQZJeJznS3g3Ww66mv4sF6VvxRX+V2fDuOExPr5886ScN6itJRVoT9KHcr84+5/Jo9X/AIf45yT4afTWPp1Xu3XlfRHI8S4ev6seu/yfy+B4mIxLsRiemOUU4jEuxGIBTiSjdXs2rqzs+zuLMRiCCnEYl2IxBJVK7d27vvbuzGJdiMQQU4jEuxGIJLsRiXYjEqQU4jEuxGIBTiMS7EYgFOIxLsRiAdZ0R6J061NajUJyU28IJuKsnbKTW/NOy7u++3a6DQ06EFTpRwgm2ldvd7vdts5zobx2l1MaFWcac6d1HJ4qUW21Zva6vax0n26l7an+pH6mllcuZpmzDlrQ2Aa/26l7an+pH6j7dS9tT/Uj9TFTMhsAZLvF13oi0KAF14C670OZE0ALrvXxMXXeviLXcUyjWLZPxNI2NVVy2XJGuzyPiWWGTiJShtor7tdflfWjp8PFxxpMgyLJMizQNlEWQZNkGSXiDwemGmzoqfbTkn/TL0Wvji/ce8a3EqedGrHvpyt52dvmbPBZvY8RDJ2a+Gz/AEbMfEQ58Uo91/5+p83xGJdiMT6O1R5YpxGJdiMSAU4jEuxGIBTiMS7EYgFOIxLsRiAU4jEuxGIBZiMS7EYiyCnEYl2IxFgpxGJfiYxFgpxGJfiYxFgpwGBdiMRYKcPAdWi7EOBaL1RDPqjBDT1M4Ql+aKl8Vcmz5UocqprY9Hd6kSLJkGOVFkYZhmTDJpdiyIswzLMMuWRBkWSZFkF0RZBk2RZJeJgjPk/JkinWTxp1Jd0G/wDixFXJR76Et0rPn0YjEvUTGJ9Qluzx8dinEYl2IxIskpxGJdiMRYKcRiXYjEWCnEYl2IxFgpxGJdiMRYL8RiXYjEqLKcTGBsU6WTjFc5NJebdjvtDooUYqMFbvfa33tlMmTkLwjznzulRc2oxTlJuyS53PZj0WrtXvTT7nJ3+KVjr/ALPDPrMVna2Vt7P/AOFhhed9DLHCup821OllTk4Ti4yXY/3XeivE7HpXpHOEJxi3KDs7LlFptt+F0vicpiZ4T5lZhnHldFOIxLsRiWK2U4jEuxGIFnZ9G6+engu2F4P3cv8Ai0eocl0X1eFR02/Rqcv5ly+O6+B1p4Lxbh3h4uS6P8S9H9Ha9K7nZ4XJz40+2nwMMgybIM5ptowYZkwwWRFmGZZGxJZEWZVGT5RbPQoaZR3e8v28i87nD+CtxvNKn2W69W9PdTNWfGJOoqzxKlNrmre6xFRbaSV2z3Wr7PdFNLTRjJyXb8u+xafgjU1yy/D17peXR9vf2smPHLldrUr0+ijHeXpP5fA2UvAyDt4cGPDHlxqvvq937zRnklN3J2aOu4RQrJ9ZSjf8yWMv7lucRx3gUtM0086UnaMu1P8ALLx/c+ilGt0sa0J05cpK3k+xrxTszZx5HF+RhnjUj5biMTYqUnFyi+cW4vzTsyGJuGnZViMS7E9fhnAJVoqcpdXF+rtdvxtdWRDkkrZaKcnSPCxMYnU0ui7VRZzypWu2tpN/ltvbzPVlwPTtY9Ul4pu/xvco80UXWKTOBxM4np8X4d1FTG94tXi3zt3PxNHEyJpq0Y3o6KsRiXYmMQLL8DGBYAVOv4TpKapU3GMW3FSbsm3Lm9/B/A9A4ajqqkFaFSUV3KTS+BuavjVSaio3ptc3GT3/APXxfia8sMm9zZjmilsdaYORdXU4db1k8G7Xz8lyv4l+i4paFRVKlRzaeO78LW37793v5FfYvuT7ZdjqGzgNTFZzx9XJ4+V3b5F9XWVJK0qk5LtTk7fAoMuPHy9TFkyKWxXgZwJgymIrwM4EwAQStutmuVjs+E65VoXfrx2mvHv8mceX6TUypSU4vdc+5rtTOd4nwC4zFS0kvyv5Pyffo0nsmbHD5/ZSvo9ztmQZTodbGtHKPP8AEu1P/vaXM8HOEscnCaprdP7++h3ISUla2MGGZIsqZEYZdo43lfuRbDSfmfwLaVBRbab37ztcH4bnjlhkyRVJ3V6+WnrWl2a2XPBxcUywAHpTQAAAAAAAAAOE49opwrVJSg1GdSTi+x3bfNdvgebgfSq1KM4uMkpRas0zguJ6Tqas6fNJ7PvT3Rt4p82hqZYcupjhPD+vng5YpRcnbns0rL4nZUKahGMFyjFRXuVjhqdRxalFuLXJp2ZsfeVb20/7hkhKT3JxzjFHaoy0eN0blUmp1Kk5SXqxTe1+bf7fMlxelqG5TjUjTpRX52tlzbsuZyJ5/wDM+y5kkt2+r7L416o3Yr+lz02392elVoxl60Iy7PSin+5xfFNPGFWpGHqp7eGybXuba9xP7xre2n/czVZ18eNx3Zo5Mil0K8BgWAymIxcXI3FwCVze4hWoyjTVKGLS9La3a9ue/wA/PsXn3N/iFClCNN06mba9LdPte+3LyI6llsyt16vVqLcuqvZbbc07X87OxboqdFwqOpPGaTxV/K1tt979/u5lcuIydJUbLFdu97XUrc+9GdHw+VWE5qSWN9nfe1m/k+y/jZbkdCVualxcjcXLFCVxcjcXAJXFyNxcAlcXI3FwC6hXlCSlCTjJd37eKOh0PG4TsqnoS7/wv6e85i4uaXGeH4OLX9Ra9Gt19fR38dTNizzxP8Pw6Hdp33W68CzTr0l/3sOH0+rnT9Sbj5cvg9j0aHSGpFpuMZW80zgfyLPhyxnBqSTT7PR310/5HQXHwlFqSafx/wC/0O1B5eh47RqpXmqcu2M3b4SezRufeFH29L9SP1O64tdDApJ7M2Aa/wB4Ufb0v1I/UfeFH29L9SP1FPsLRsA1/vCj7el+pH6j7wo+3pfqR+op9haNgGv94Ufb0v1I/UfeFH29L9SP1FPsLRsA1/vCj7el+pH6kfvCj7el+pH6in2Fo2jiulFRPUSS/DGMX52v/k9vifSOnBNUmqk+y3qrxb7fJHHTqOTcpO7bu2+1vmzPhg0+ZmDNNNcouLkbi5sGubmlr1bxp06k43dklJpXb7l5m/0g4hk1Rg24Q2k73yku99tv3PIoV3B5R9azSfc2rX87NldzXlw8ZZVka229Xu36dL6tvdIyrI1BxXX9vL5+hK4uRuLmwYiVxcjcXAIXFyFxckE7i5C4uATuSU2rpNpPn49u/eVXFyATuLkLi5IJ3FyFxcAncXIXFwCdxchcXAJ3FyFxcAncXIXFwCdxchcXAJ3FyFxcAncXIXFwCdxchcXAJ3FyFxcAncXIXFwCdxchcXAJ3FyFxcAncXIXFwCdxchcxcAhcXALAXFwABcXAAFxcAAXFwABcXAAFxcAAXFwABcXAAFxcAAXFwABcXAAFxcAAXFwABcXAAFxcAAXFwABcXAAFxcAA//Z"
                alt="Card image cap"
              />
              <CardBody>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {city.name}
                </CardSubtitle>
                <CardTitle tag="h5">{handleDegree(city.main.temp)}</CardTitle>
                <CardText>
                  Sunrize:
                  {new Date(city.sys.sunrise).toLocaleTimeString()} <br />
                  Sunset: {new Date(city.sys.sunset).toLocaleTimeString()}
                </CardText>
                <Button
                  className="bg-transparent btn-outline-danger"
                  onClick={() => handleRemove(city)}
                >
                  Remove
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Weather;
