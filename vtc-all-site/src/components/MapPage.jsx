import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { NavBar } from "./NavBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Suspense } from "react";

export const Map = () => {
  return (
    <Container>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <h1 className="display-1">Store Locations</h1>
      </Row>
      <Row id="map">
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
            <Marker position={[41.13813, -81.78925]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Suspense>
      </Row>
    </Container>
  );
};
