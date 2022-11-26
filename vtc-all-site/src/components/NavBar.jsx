import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import { useAuthenticator, Button, Heading, View } from "@aws-amplify/ui-react";
import { Outlet, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            fluid={true}
            style={{ width: "25vh" }}
            src="/assets/imgs/valley_logo.png"
            alt="valley logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/inventoryFeed">Inventory</Nav.Link>
            <Nav.Link href="/map">Map</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              {route !== "authenticated" ? (
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              ) : (
                <NavDropdown.Item className="bg-warning" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              )}

              <NavDropdown.Item href="/admin">Dashboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
