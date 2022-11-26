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
import Image from "react-bootstrap/esm/Image";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
export const Home = () => {
  const [carsFetched, setCarsFetched] = useState(false);
  const [hotCars, setHotCars] = useState([]);
  useEffect(() => {
    if (!carsFetched) {
      fetchCars();
      setCarsFetched(true);
    }
  }, [carsFetched]);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
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

      <Container>
        <Row className="text-center">
          <Col>
            <h1>Number of Site Visits</h1>
            <p>{incrementSiteVisits()}</p>
            <Row>
              <p>
                We have a strong and committed sales staff with many years of
                experience satisfying our customers' needs. Feel free to browse
                our inventory online, request more information about vehicles,
                set up a test drive or inquire about financing!
              </p>
            </Row>
            <Row>
              <Col>
                <Button href="/inventoryFeed">All Our Inventory</Button>
              </Col>
              <Col>
                <Button variant="success" href="/map">
                  Store Map Locations
                </Button>
              </Col>
            </Row>
            <p className="mt-3">
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
            {hotCars.map((car) => {
              console.log(car);
              return car.trending ? (
                <Col md={3}>
                  <Card className="m-3" style={{ height: "40rem" }}>
                    <Card.Img variant="top" src={car.image} />
                    <Card.Body>
                      <Card.Title>
                        {String.fromCodePoint("0x1F525")} {car.make} -{" "}
                        {new Date(car.makeDate).getFullYear()}
                      </Card.Title>
                      <Card.Subtitle>
                        {currencyFormatter.format(car.listingPrice)}
                      </Card.Subtitle>
                      <Card.Text>{car.blurb}</Card.Text>
                      <Link
                        className="link"
                        to={{
                          pathname: `/carListings/${car.id}`,
                        }}
                        state={car}
                      >
                        <Button variant="info" onClick={() => console.log(car)}>
                          Check Listing
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ) : (
                ""
              );
            })}
          </Row>
        </Row>
        <Row>
          <Col>
            <FooterBar />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
