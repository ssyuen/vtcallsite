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

  const [filterInUse, setFilterInUse] = useState(false);

  const [filteredCars, setFilteredCars] = useState([]);

  const [listingPrice, setListingPrice] = useState("");
  const [listingPriceCars, setListingPriceCars] = useState([]);
  const [listingPriceFilterInUse, setListingPriceFilterInUse] = useState(false);
  const [manualListPriceInputInUse, setManualListPriceInputInUse] =
    useState(false);
  const [manualListPriceInput, setManualListPriceInput] = useState("");

  const [yearFilter, setYearFilter] = useState("");
  const [yearFilterInUse, setYearFilterInUse] = useState(false);
  const [yearCars, setYearCars] = useState([]);

  const [makeFilter, setMakeFilter] = useState("");
  const [makeFilterInUse, setMakeFilterInUse] = useState(false);
  const [makeCars, setMakeCars] = useState([]);

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
  const filterByYear = (e) => {
    setYearFilter(e.target.value);
  };
  const filterByMake = (e) => {
    setMakeFilter(e.target.value);
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

    setListingPriceCars(carsToShow);

    let tempCars = carsToShow;
    // CHECK IF OTHER FILTERS ARE IN USE
    if (yearFilterInUse) {
      tempCars.concat(yearCars);
    }
    if (makeFilterInUse) {
      tempCars.concat(makeCars);
    }
    let removedDuplicates = new Set(tempCars);
    tempCars = Array.from(removedDuplicates);

    setFilteredCars(tempCars);
    setListingPriceFilterInUse(true);
    setFilterInUse(true);
  };

  const applyMakeFilter = () => {
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

    setListingPriceCars(carsToShow);

    let tempCars = carsToShow;
    // CHECK IF OTHER FILTERS ARE IN USE
    if (yearFilterInUse) {
      tempCars.concat(yearCars);
    }
    if (makeFilterInUse) {
      tempCars.concat(makeCars);
    }
    let removedDuplicates = new Set(tempCars);
    tempCars = Array.from(removedDuplicates);

    setFilteredCars(tempCars);
    setListingPriceFilterInUse(true);
    setFilterInUse(true);
  };

  const applyYearFilter = () => {
    // LOOP THRU CARS
    let carsToShow = [];
    if (cars.length > 0) {
      cars.forEach((car) => {
        if (
          new Date(car.makeDate).getFullYear() < yearFilter ||
          new Date(car.makeDate).getFullYear() === yearFilter
        ) {
          carsToShow.push(car);
        }
      });
    }

    setYearCars(carsToShow);

    let tempCars = carsToShow;
    // CHECK IF OTHER FILTERS ARE IN USE
    if (listingPriceFilterInUse) {
      tempCars.concat(listingPriceCars);
    }
    if (makeFilterInUse) {
      tempCars.concat(makeCars);
    }
    let removedDuplicates = new Set(tempCars);
    tempCars = Array.from(removedDuplicates);

    setFilteredCars(tempCars);
    setYearFilterInUse(true);
    setFilterInUse(true);
  };

  // FOR RESET FUNCTIONS, REMOVE USING RESPECTIVE STATE ARRAYS FOR THEIR FILTER
  const resetListingFilter = () => {
    let tempCars = [];
    if (makeFilterInUse && yearFilterInUse) {
      tempCars = makeCars;
      tempCars.concat(yearCars);
      let removedDuplicates = new Set(tempCars);
      tempCars = Array.from(removedDuplicates);
      setFilteredCars(tempCars);
    } else {
      // NO FILTERS REMAINING
      setFilterInUse(false);
      setFilteredCars([]);
    }

    if (makeFilterInUse) {
      tempCars = makeCars;
      setFilteredCars(tempCars);
    }
    if (yearFilterInUse) {
      tempCars = yearCars;
      setFilteredCars(tempCars);
    }

    setListingPriceFilterInUse(false);
  };

  const resetMakeFilter = () => {
    let tempCars = [];
    if (listingPriceFilterInUse && yearFilterInUse) {
      tempCars = listingPriceCars;
      tempCars.concat(yearCars);
      let removedDuplicates = new Set(tempCars);
      tempCars = Array.from(removedDuplicates);
      setFilteredCars(tempCars);
    } else {
      // NO FILTERS REMAINING
      setFilterInUse(false);
      setFilteredCars([]);
    }

    if (listingPriceFilterInUse) {
      tempCars = listingPriceCars;
      setFilteredCars(tempCars);
    }
    if (yearFilterInUse) {
      tempCars = yearCars;
      setFilteredCars(tempCars);
    }

    setMakeFilterInUse(false);
  };

  const resetYearFilter = () => {
    let tempCars = [];
    if (listingPriceFilterInUse && makeFilterInUse) {
      tempCars = listingPriceCars;
      tempCars.concat(yearCars);
      let removedDuplicates = new Set(tempCars);
      tempCars = Array.from(removedDuplicates);
      setFilteredCars(tempCars);
    } else {
      // NO FILTERS REMAINING
      setFilterInUse(false);
      setFilteredCars([]);
    }

    if (makeFilterInUse) {
      tempCars = makeCars;
      setFilteredCars(tempCars);
    }
    if (yearFilterInUse) {
      tempCars = yearCars;
      setFilteredCars(tempCars);
    }

    setYearFilterInUse(false);
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
          <Row className="mt-3">
            <h5>Make</h5>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Label>Current Filter: {yearFilter}</Form.Label>
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
              <Button className="mx-3" onClick={applyMakeFilter}>
                Apply Make Filter
              </Button>
              <Button onClick={resetMakeFilter} variant="danger">
                Remove Make Filter
              </Button>
            </Form>
          </Row>
          <Row className="mt-3">
            <h5>Year</h5>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Label>Current Filter: {yearFilter}</Form.Label>
              <Form.Control
                type="number"
                min={1900}
                max="2099"
                step="1"
                onChange={filterByYear}
                value={yearFilter}
              ></Form.Control>

              <Button className="mx-3 mt-3" onClick={applyYearFilter}>
                Apply Year Filter
              </Button>
              <Button
                className=" mt-3"
                onClick={resetYearFilter}
                variant="danger"
              >
                Remove Year Filter
              </Button>
            </Form>
          </Row>
        </Col>
        <Col md="9">
          {/* PULL ALL CARS HERE */}
          <Row>
            {filterInUse
              ? filteredCars.map((car) => {
                  return (
                    <Col md={3} key={car.id}>
                      <Card style={{ height: "45rem" }}>
                        <Card.Img variant="top" src={car.image} />
                        <Card.Body>
                          <Card.Title>
                            {car.make} - {new Date(car.makeDate).getFullYear()}
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
                            <Button
                              variant="info"
                              onClick={() => console.log(car)}
                            >
                              Check Listing
                            </Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              : cars.map((car) => {
                  return (
                    <Col md={3} key={car.id}>
                      <Card style={{ height: "45rem" }}>
                        <Card.Img variant="top" src={car.image} />
                        <Card.Body>
                          <Card.Title>
                            {car.make} - {new Date(car.makeDate).getFullYear()}
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
                            <Button
                              variant="info"
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
