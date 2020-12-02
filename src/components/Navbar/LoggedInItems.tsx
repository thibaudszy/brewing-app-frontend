import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";
import { selectUser, selectUserLanguage } from "../../store/user/selectors";
import { useHistory } from "react-router-dom";

export function LoggedInLinks() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const {
    myRecipes,
    create_a_recipe,

    t_import_recipes,
    t_new_recipes,
  } = translation[userLanguage];
  const history = useHistory();
  return (
    <Nav>
      <Nav.Link onClick={() => history.push("/recipes")}>{myRecipes}</Nav.Link>
      <NavDropdown title={t_new_recipes} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => history.push("/explore-recipes")}>
          {t_import_recipes}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push("/recipe-calculator")}>
          {create_a_recipe}
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}
export function LogOutButton() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUser).email;
  const history = useHistory();
  const logOutClickHandler = () => {
    dispatch(logOut());
    history.push("/");
  };
  const userLanguage: Language = useSelector(selectUserLanguage);
  return (
    <Nav>
      <p style={{ marginRight: "1em" }}> {userEmail}</p>
      <Button
        onClick={() => {
          logOutClickHandler();
        }}
      >
        {translation[userLanguage]["LogOut"]}
      </Button>
    </Nav>
  );
}
