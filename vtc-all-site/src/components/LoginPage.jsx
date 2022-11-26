import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { NavBar } from "./NavBar";

import "@aws-amplify/ui-react/styles.css";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

export const Login = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (route === "authenticated") {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return (
    <Container>
      <Row>
        <NavBar />
      </Row>
      <Row className="text-center">
        <h1 className="display-1">Site Administrator Login</h1>
      </Row>
      <Row>
        <Col>
          <Authenticator></Authenticator>
        </Col>
      </Row>
    </Container>
  );
};
