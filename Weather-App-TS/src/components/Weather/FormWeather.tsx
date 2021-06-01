import React from "react";
import { Button, Col, Form, Input, Label } from "reactstrap";

const FormWeather: React.FC<{
  inputVal: string;
  handleSubmit: (e: any) => void;
  handleChangeWeather: (e: React.FormEvent<HTMLInputElement>) => void;
}> = ({ handleSubmit, handleChangeWeather, inputVal }) => {
  return (
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
  );
};

export default FormWeather;
