import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NavBar } from "./NavBar";
import { API, graphqlOperation } from "aws-amplify";
import {
  createCar,
  createOwner,
  createStore,
  deleteCar,
  deleteOwner,
  deleteStore,
} from "../graphql/mutations";
import { listCars, listOwners, listStores } from "../graphql/queries";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from "react-bootstrap/Spinner";
import _ from "lodash";

export const Admin = () => {
  // const gqlCreateCar = ()_
  const [cars, setCars] = useState([]);
  const [carsFetched, setCarsFetched] = useState(false);
  const [stores, setStores] = useState([]);
  const [storesFetched, setStoresFetched] = useState(false);
  const [owners, setOwners] = useState([]);
  const [ownersFetched, setOwnersFetched] = useState(false);

  const [storeSelected, setStoreSelected] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState("");

  const [ownerSelected, setOwnerSelected] = useState(false);
  const [ownerToDelete, setOwnerToDelete] = useState("");

  const [carSelected, setCarSelected] = useState(false);
  const [carToDelete, setCarToDelete] = useState("");

  useEffect(() => {
    if (!carsFetched) {
      fetchAllCars();
      setCarsFetched(true);
    }
    if (!storesFetched) {
      fetchAllStores();
      setStoresFetched(true);
    }

    if (!ownersFetched) {
      fetchAllOwners();
      setOwnersFetched(true);
    }
  }, [carsFetched, storesFetched, ownersFetched]);

  const fetchAllCars = async () => {
    setCarsFetched(false);
    const response = await API.graphql({ query: listCars });
    const carsFromApi = response.data.listCars.items;
    console.log(carsFromApi);
    setCars(carsFromApi);
    setCarsFetched(true);
  };

  const fetchAllStores = async () => {
    setStoresFetched(false);
    const response = await API.graphql({ query: listStores });
    const storesFromApi = response.data.listStores.items;
    console.log(storesFromApi);
    setStores(storesFromApi);
    setStoresFetched(true);
  };
  const fetchAllOwners = async () => {
    setOwnersFetched(false);
    const response = await API.graphql({ query: listOwners });
    const ownersFromApi = response.data.listOwners.items;
    console.log(ownersFromApi);
    setOwners(ownersFromApi);
    setOwnersFetched(true);
  };

  const selectStore = (e) => {
    if (e.target.innerHTML === storeToDelete) {
      setStoreToDelete("");
      setStoreSelected(false);
    } else {
      setStoreToDelete(e.target.innerHTML);
      setStoreSelected(true);
    }
  };
  const deleteSelectedStore = async () => {
    await API.graphql(
      graphqlOperation(deleteStore, {
        input: {
          id: storeToDelete,
        },
      })
    );
    await fetchAllStores();
  };

  const selectCar = (e) => {
    if (e.target.innerHTML === carToDelete) {
      setCarToDelete("");
      setCarSelected(false);
    } else {
      setCarToDelete(e.target.innerHTML);
      setCarSelected(true);
    }
  };
  const deleteSelectedCar = async () => {
    await API.graphql(
      graphqlOperation(deleteCar, {
        input: {
          id: carToDelete,
        },
      })
    );
    await fetchAllCars();
  };

  const selectOwner = (e) => {
    if (e.target.innerHTML === ownerToDelete) {
      setOwnerToDelete("");
      setOwnerSelected(false);
    } else {
      setOwnerToDelete(e.target.innerHTML);
      setOwnerSelected(true);
    }
  };
  const deleteSelectedOwner = async () => {
    await API.graphql(
      graphqlOperation(deleteOwner, {
        input: {
          id: ownerToDelete,
        },
      })
    );
    await fetchAllOwners();
  };

  const clearAllStores = async () => {
    stores.forEach(async (store) => {
      await API.graphql(
        graphqlOperation(deleteStore, {
          input: {
            id: store.id,
          },
        })
      );
    });
    fetchAllStores();
  };

  const clearAllOwners = async () => {
    owners.forEach(async (store) => {
      await API.graphql(
        graphqlOperation(deleteOwner, {
          input: {
            id: store.id,
          },
        })
      );
    });
    fetchAllOwners();
  };

  const clearAllCars = async () => {
    cars.forEach(async (store) => {
      await API.graphql(
        graphqlOperation(deleteCar, {
          input: {
            id: store.id,
          },
        })
      );
    });
    fetchAllCars();
  };

  const handleFullSchemaGenerator = async () => {
    // GENERATE STORE FIRST
    await API.graphql(
      graphqlOperation(createStore, {
        input: {
          name: faker.address.city(),
          xCoord: faker.address.latitude(),
          yCoord: faker.address.longitude(),
          address:
            faker.address.streetAddress(true) +
            " " +
            faker.address.cityName() +
            ", " +
            faker.address.state(),
        },
      })
    );
    fetchAllStores();

    // THEN GET RANDOM EXISTING STORE ID
    // TO USE TO CONNECT TO NEW CAR
    const store = _.sample(stores);

    // IF THERE ARE ANY CARS, PULL A RANDOM ONE
    // ADD TO OWNER CAR HISTORY
    let car = {};
    if (cars.length > 0) {
      car = _.sample(cars);
    } else {
      await API.graphql(
        graphqlOperation(createCar, {
          input: {
            make: faker.vehicle.model(),
            makeDate: faker.date.between(
              "2020-01-01T00:00:00.000Z",
              "2030-01-01T00:00:00.000Z"
            ), // '2026-05-16T02:22:53.002Z'
            blurb: faker.lorem.paragraph(),
            image: faker.image.transport("", "", true),
            trending: Math.random() < 0.5,
            color: faker.vehicle.color(),
            store: store,

            listingPrice: faker.commerce.price(0, 1000000),
          },
        })
      );
      fetchAllCars();
      car = _.sample(cars);
    }

    // GENERATE OWNER
    await API.graphql(
      graphqlOperation(createOwner, {
        input: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phoneNumber: faker.phone.number(),
          carHistory: [car],
        },
      })
    );
    fetchAllOwners();

    // PULL RANDOM EXISTING OWNER ID
    // TO USE TO CONNECT TO NEW CAR
    const owner = _.sample(owners);
    // GENERATE CAR
    await API.graphql(
      graphqlOperation(createCar, {
        input: {
          make: faker.vehicle.model(),
          makeDate: faker.date.between(
            "2020-01-01T00:00:00.000Z",
            "2030-01-01T00:00:00.000Z"
          ), // '2026-05-16T02:22:53.002Z'
          blurb: faker.lorem.paragraph(),
          image: faker.image.transport("", "", true),
          trending: Math.random() < 0.5,
          color: faker.vehicle.color(),
          store: store,
          owners: [owner],
          listingPrice: faker.commerce.price(0, 1000000),
        },
      })
    );
    fetchAllCars();
    //
  };

  return (
    <Container fluid={true}>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <h1 className="display-1">Admin Dashboard</h1>
        <p>Use this to edit items in the database!</p>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleFullSchemaGenerator}>
            Generate one of each!
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr></hr>
          <Row>
            <h4>Store Actions</h4>
          </Row>
          <Row>
            <Col>
              <Button
                className="mx-3"
                onClick={() => {
                  API.graphql(
                    graphqlOperation(createStore, {
                      input: {
                        name: faker.address.city(),
                        xCoord: faker.address.latitude(),
                        yCoord: faker.address.longitude(),
                        address:
                          faker.address.streetAddress(true) +
                          " " +
                          faker.address.cityName() +
                          ", " +
                          faker.address.state(),
                      },
                    })
                  );
                  fetchAllStores();
                }}
              >
                Generate a random store
              </Button>
            </Col>
            <Col>
              <Button
                className="mx-3"
                disabled={!storeSelected}
                variant="warning"
                onClick={deleteSelectedStore}
              >
                Delete Selected Item
              </Button>
            </Col>
            <Col>
              <OverlayTrigger
                key={"right"}
                placement={"right"}
                overlay={
                  <Tooltip>This will clear ALL entries from the table!</Tooltip>
                }
              >
                <Button
                  // disabled={stores.length === 0}
                  variant="danger"
                  onClick={clearAllStores}
                >
                  Clear table
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Row>
              <h4>Owner Actions</h4>
            </Row>
            <Col>
              <Button
                className="mx-3"
                onClick={() => {
                  API.graphql(
                    graphqlOperation(createOwner, {
                      input: {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        phoneNumber: faker.phone.number(),
                      },
                    })
                  );
                  fetchAllOwners();
                }}
              >
                Generate a random owner
              </Button>
            </Col>
            <Col>
              <Button
                className="mx-3"
                disabled={!ownerSelected}
                variant="warning"
                onClick={deleteSelectedOwner}
              >
                Delete Selected Item
              </Button>
            </Col>
            <Col>
              <OverlayTrigger
                key={"right"}
                placement={"right"}
                overlay={
                  <Tooltip>This will clear ALL entries from the table!</Tooltip>
                }
              >
                <Button
                  disabled={owners.length === 0}
                  variant="danger"
                  onClick={clearAllOwners}
                >
                  Clear table
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Row>
              <h4>Car Actions</h4>
            </Row>
            <Col>
              <Button
                className="mx-3"
                onClick={() => {
                  API.graphql(
                    graphqlOperation(createCar, {
                      input: {
                        make: faker.vehicle.model(),
                        makeDate: faker.date.between(
                          "2020-01-01T00:00:00.000Z",
                          "2030-01-01T00:00:00.000Z"
                        ), // '2026-05-16T02:22:53.002Z'
                        blurb: faker.lorem.paragraph(),
                        image: faker.image.transport("", "", true),
                        trending: Math.random() < 0.5,
                        color: faker.vehicle.color(),
                        listingPrice: faker.commerce.price(0, 1000000),
                      },
                    })
                  );
                  fetchAllCars();
                }}
              >
                Generate a random car
              </Button>
            </Col>
            <Col>
              <Button
                className="mx-3"
                disabled={!carSelected}
                variant="warning"
                onClick={deleteSelectedCar}
              >
                Delete Selected Item
              </Button>
            </Col>
            <Col>
              <OverlayTrigger
                key={"right"}
                placement={"right"}
                overlay={
                  <Tooltip id="tooltip-right">
                    This will clear ALL entries from the table!
                  </Tooltip>
                }
              >
                <Button
                  disabled={cars.length === 0}
                  variant="danger"
                  onClick={clearAllCars}
                >
                  Clear table
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <hr></hr>
        </Col>
        <Col>
          <Row className="mx-5">
            <Col className="">
              <h2 className="display-2">Stores</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID #</th>
                    <th>Location Name</th>
                    <th>Address</th>
                    <th>X Coordinates</th>
                    <th>Y Coordinates</th>
                  </tr>
                </thead>
                {stores.length > 0 && storesFetched ? (
                  <>
                    <tbody>
                      {/* loop over rows here from fetch all cars */}
                      {stores.map((store) => {
                        return (
                          <tr>
                            <td
                              id={store.id}
                              onClick={selectStore}
                              className={
                                store.id === storeToDelete ? "bg-warning" : ""
                              }
                            >
                              {store.id}
                            </td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>{store.xCoord}</td>
                            <td>{store.yCoord}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </>
                ) : (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Table>
            </Col>
          </Row>
          <Row className="mx-5">
            <Col>
              <h2 className="display-2">Owners</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID #</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Car History</th>
                  </tr>
                </thead>
                {owners.length > 0 && ownersFetched ? (
                  <tbody>
                    {/* loop over rows here from fetch all cars */}
                    {owners.map((owners) => {
                      return (
                        <tr>
                          <td
                            id={owners.id}
                            onClick={selectOwner}
                            className={
                              owners.id === ownerToDelete ? "bg-warning" : ""
                            }
                          >
                            {owners.id}
                          </td>
                          <td>{owners.firstName}</td>
                          <td>{owners.lastName}</td>
                          <td>{owners.phoneNumber}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Table>
            </Col>
          </Row>
          <Row className="mx-5">
            <Col>
              <h2 className="display-2">Cars</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID #</th>
                    <th>Make</th>
                    <th>Store</th>
                    <th>Make Date</th>
                    <th>Color</th>
                    <th>Listing $</th>
                    <th>Blurb</th>
                    <th>Image URL</th>
                    <th>Trending</th>
                    <th>Owners</th>
                  </tr>
                </thead>
                {cars.length > 0 && carsFetched ? (
                  <tbody>
                    {/* loop over rows here from fetch all cars */}
                    {cars.map((car) => {
                      console.log(car);
                      return (
                        <tr>
                          <td
                            id={car.id}
                            onClick={selectCar}
                            className={
                              car.id === carToDelete ? "bg-warning" : ""
                            }
                          >
                            {car.id}
                          </td>
                          <td>{car.make}</td>
                          <td>{car.store}</td>
                          <td>{car.makeDate}</td>
                          <td>{car.color}</td>
                          <td>{car.listingPrice}</td>
                          <td>{car.blurb}</td>
                          <td>{car.image}</td>
                          <td>{car.trending.toString()}</td>
                          {/* <td>{car.owners}</td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
