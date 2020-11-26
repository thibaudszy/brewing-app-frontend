import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch } from "react-redux";

export function LoggedInLinks() {
  return (
    <Nav>
      <NavDropdown title="Recipes" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">My recipes</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Create a recipe</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#home">Start a brew</Nav.Link>
    </Nav>
  );
}
export function LogOutButton() {
  const dispatch = useDispatch();
  const logOutClickHandler = () => {
    dispatch(logOut());
  };

  return (
    <Button
      onClick={() => {
        logOutClickHandler();
      }}
    >
      {" "}
      Log Out
    </Button>
  );
}
