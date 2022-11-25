import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

export const IndividualCarPage = () => {
  const { state } = useLocation();
  const car = state;
  console.log(car);

  return (
    <Container fluid>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <h1 className="display-1">
          {car.make} - {new Date(car.makeDate).getFullYear()}
        </h1>
        <Col>
          <Image src={car.image} alt="car"></Image>
          <p>{car.blurb}</p>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
