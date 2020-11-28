import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";
import { selectUserLanguage } from "../../store/user/selectors";

export function LoggedInLinks() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const {
    Recipes,
    myRecipes,
    create_a_recipe,
    start_a_brew,
    t_import_recipes,
    t_new_recipes,
  } = translation[userLanguage];
  return (
    <Nav>
      <Nav.Link href="/recipes">{myRecipes}</Nav.Link>
      <NavDropdown title={t_new_recipes} id="basic-nav-dropdown">
        <NavDropdown.Item href="/explore-recipes">
          {t_import_recipes}
        </NavDropdown.Item>
        <NavDropdown.Item href="recipe-calculator">
          {create_a_recipe}
        </NavDropdown.Item>
      </NavDropdown>
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
