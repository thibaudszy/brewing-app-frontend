import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";
import { LoggedInLinks, LogOutButton } from "./LoggedInItems";
import LoggedOutItems from "./LoggedOutItems";
import translation from "./translation";
//import { AvailableLanguages } from "../../config/globalTypes";

export default function AppNavbar() {
  const token = useSelector(selectToken);
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { Home } = translation[userLanguage];
  const history = useHistory();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={() => history.push("/")}>Bitter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/")}>{Home}</Nav.Link>
            {token ? <LoggedInLinks /> : ""}
          </Nav>
          {token ? <LogOutButton /> : <LoggedOutItems />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
