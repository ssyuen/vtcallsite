import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FooterBar } from "./FooterBar";
import Button from "react-bootstrap/esm/Button";
import { NavBar } from "./NavBar";
import { incrementSiteVisits } from "../utils";
import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import { listCars, listStores } from "../graphql/queries";
export const Home = () => {
  const [carsFetched, setCarsFetched] = useState(false);
  const [hotCars, setHotCars] = useState([]);
  useEffect(() => {
    if (!carsFetched) {
      fetchCars();
      setCarsFetched(true);
    }
  }, [carsFetched]);

  const fetchCars = async () => {
    const response = await API.graphql({ query: listCars });
    const carsFromApi = response.data.listCars.items;
    console.log(carsFromApi);
    setHotCars(carsFromApi);
  };

  return (
    <Container fluid={true}>
      <Row>
        <NavBar />
      </Row>

      <Row className="text-center g-0">
        <Col>
          <h1>Number of Site Visits</h1>
          <p>{incrementSiteVisits()}</p>
          <Row>
            <p>
              We have a strong and committed sales staff with many years of
              experience satisfying our customers' needs. Feel free to browse
              our inventory online, request more information about vehicles, set
              up a test drive or inquire about financing!
            </p>
          </Row>
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
      <Row className="text-center">
        <Col>
          <h1 className="display-1">Hot Inventory</h1>
        </Col>
        <Row>
          {/* DISPLAY DATA FROM RDS HERE */}
          {hotCars.map((car) => {
            return "";
          })}
        </Row>
      </Row>
      <Row>
        <Col>
          <FooterBar />
        </Col>
      </Row>
    </Container>
  );
};
