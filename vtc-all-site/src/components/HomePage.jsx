import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FooterBar } from "./FooterBar";
import Button from "react-bootstrap/esm/Button";
import { NavBar } from "./NavBar";
import { incrementSiteVisits } from "../utils";

export const Home = () => {
  return (
    <Container className="g-0">
      <Row>
        <NavBar />
      </Row>

      <Row>
        <Col>
          <h1>Number of Site Visits</h1>
          <p>{incrementSiteVisits()}</p>
          <Row>
            <Col>
              <Button href="/inventoryFeed">All Our Inventory</Button>
            </Col>
            <Col>
              <Button href="/map">Store Map Locations</Button>
            </Col>
          </Row>
          <p>
            Our selection of inventory ranges from small consumer vehicles to
            commercial vehicles!
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-1">Hot Inventory</h1>
        </Col>
        <Row>{/* DISPLAY DATA FROM RDS HERE */}</Row>
      </Row>
      <Row>
        <Col>
          <FooterBar />
        </Col>
      </Row>
    </Container>
  );
};
