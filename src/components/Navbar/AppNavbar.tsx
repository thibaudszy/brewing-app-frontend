import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppNavbar() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">My name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>

            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My recipes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Create a recipe
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#home">Start a brew</Nav.Link>
          </Nav>
          <Button style={{ marginRight: "1em" }}> Log in </Button>
          <Button style={{ marginRight: "1em" }}> Sign up </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
