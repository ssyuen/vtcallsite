import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NavBar } from "./NavBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Suspense, useState } from "react";
import { useEffect } from "react";
import { API } from "aws-amplify";
import { listStores } from "../graphql/queries";
import Col from "react-bootstrap/esm/Col";
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

export const Map = () => {
  const [stores, setStores] = useState([]);
  const [storesFetched, setStoresFetched] = useState(false);
  useEffect(() => {
    if (!storesFetched) {
      fetchAllStores();
    }
  }, [storesFetched]);

  const fetchAllStores = async () => {
    const response = await API.graphql({ query: listStores });
    const storesFromApi = response.data.listStores.items;
    console.log(storesFromApi);
    setStores(storesFromApi);
    setStoresFetched(true);
  };

  return (
    <Container fluid>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <h1 className="display-1">Store Locations</h1>
      </Row>
      <Row id="map">
        <Col md={3}>
          <ListGroup>
            {stores.map((store) => {
              return (
                <ListGroupItem>{store.name} </ListGroupItem>
              )
            })}
          </ListGroup>
        </Col>
        <Col md={9}>
          <Suspense fallback={<div>...loading</div>}>
            <MapContainer
              center={[41.13813, -81.78925]}
              zoom={8}
              trackResize={false}
              style={{ height: "70vh", width: "100wh" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution="© OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {stores.map((store) => {
                return (
                  <Marker position={[store.xCoord + "", store.xCoord + ""]}>
                    <Popup>{store.name}</Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};
