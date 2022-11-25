import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listCars } from "../graphql/queries";
import Card from "react-bootstrap/Card";
// import CardHeader from "react-bootstrap/esm/CardHeader";
// import CardImg from "react-bootstrap/esm/CardImg";
// import CardGroup from "react-bootstrap/esm/CardGroup";
import Button from "react-bootstrap/esm/Button";
import { faker } from "@faker-js/faker";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const InventoryFeed = () => {
  const [cars, setCars] = useState([]);
  const [carsFetched, setCarsFetched] = useState(false);

  const [listingPrice, setListingPrice] = useState("");
  const [listingPriceFilterInUse, setListingPriceFilterInUse] = useState(false);
  const [manualListPriceInputInUse, setManualListPriceInputInUse] =
    useState(false);
  const [manualListPriceInput, setManualListPriceInput] = useState("");

  useEffect(() => {
    if (!carsFetched) {
      fetchAllCars();
    }
  }, [carsFetched]);

  const fetchAllCars = async () => {
    setCarsFetched(false);
    const response = await API.graphql({ query: listCars });
    const carsFromApi = response.data.listCars.items;
    console.log(carsFromApi);
    setCars(carsFromApi);
    setCarsFetched(true);
  };

  const filterByListingPrice = (e) => {
    console.log(e);
    setManualListPriceInputInUse(false);

    setListingPrice(e.target.value);
    //
  };
  const manualListingPriceSetter = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      setListingPrice(e.target.value);
      setManualListPriceInputInUse(false);
    } else {
      setManualListPriceInput(e.target.value);
      setManualListPriceInputInUse(true);
    }
  };
  const applyListingFilter = () => {
    // LOOP THRU CARS
    let carsToShow = [];
    if (cars.length > 0) {
      cars.forEach((car) => {
        if (
          Number(car.listingPrice) < Number(listingPrice) ||
          Number(car.listingPrice) === Number(listingPrice)
        ) {
          carsToShow.push(car);
        }
      });
    }
    setCars(carsToShow);
    setListingPriceFilterInUse(true);
  };
  const resetListingFilter = () => {
    setListingPriceFilterInUse(false);
  };
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container fluid>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <h1 className="display-1">Inventory Feed</h1>
        <p>
          An aggregation of all our inventories from all our store locations
        </p>
      </Row>
      <Row>
        <Col md="3">
          <Row>
            <h3>Filters</h3>
          </Row>
          <Row>
            <h5>Listing Price</h5>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Label>
                Current Filter: {currencyFormatter.format(listingPrice)}
              </Form.Label>
              <Form.Control
                type="number"
                max={1000000}
                min={0}
                onChange={manualListingPriceSetter}
                value={
                  manualListPriceInputInUse
                    ? manualListPriceInput
                    : listingPrice
                }
              ></Form.Control>
              <Form.Range
                onChange={filterByListingPrice}
                value={listingPrice}
                max={1000000}
                min={0}
              />
              <Button className="mx-3" onClick={applyListingFilter}>
                Apply Listing Price Filter
              </Button>
              <Button onClick={resetListingFilter} variant="danger">
                Remove Listing Price Filter
              </Button>
            </Form>
          </Row>
        </Col>
        <Col md="9">
          {/* PULL ALL CARS HERE */}
          <Row>
            {cars.map((car) => {
              let randImg = faker.image.transport("", "", true);
              return (
                <Col md={3} key={car.id}>
                  <Card>
                    <Card.Img variant="top" src={randImg} />
                    <Card.Body>
                      <Card.Title>
                        {car.make} - {new Date(car.makeDate).getFullYear()}
                      </Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Link
                        className="link"
                        to={{
                          pathname: `/carListings/${car.id}`,
                        }}
                        state={car}
                      >
                        <Button
                          variant="primary"
                          onClick={() => console.log(car)}
                        >
                          Check Listing
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
