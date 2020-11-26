import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";
import { selectUserLanguage } from "../../store/user/selectors";

export function LoggedInLinks() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { Recipes, myRecipes, create_a_recipe, start_a_brew } = translation[
    userLanguage
  ];
  return (
    <Nav>
      <NavDropdown title={Recipes} id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">{myRecipes}</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          {create_a_recipe}
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#home">{start_a_brew}</Nav.Link>
    </Nav>
  );
}
export function LogOutButton() {
  const dispatch = useDispatch();
  const logOutClickHandler = () => {
    dispatch(logOut());
  };
  const userLanguage: Language = useSelector(selectUserLanguage);
  return (
    <Button
      onClick={() => {
        logOutClickHandler();
      }}
    >
      {translation[userLanguage]["LogOut"]}
    </Button>
  );
}
