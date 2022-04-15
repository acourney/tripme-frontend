import React from "react";
import { Navbar, Container, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./GettingStarted.css";

function GettingStarted(props) {
  return (
    <Container className="m-4 p-5 border rounded-3 bg-light">
      <p className="getting-started-p">
        <span>TripMe</span> is a site to organize your upcoming trips and
        vacations.
        <br />
        <br />
        Once you sign up and create an account, you can start adding trips to
        your site and start planning. You can make todo lists and add friends to
        your trip so they can view it too and help you plan.
        <br />
        <br />
        There is also a messaging center so you can talk to your friends about
        your trips.
      </p>
      <br />
      <LinkContainer to="/signup">
        <Navbar.Brand>Sign up today to get started!</Navbar.Brand>
      </LinkContainer>
    </Container>
  );
}

export default GettingStarted;
