import React from "react";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";
import { selectUserLanguage } from "../../store/user/selectors";

export default function LogOutButton() {
  const dispatch = useDispatch();
  const logOutClickHandler = () => {
    dispatch(logOut());
  };
  // const userLanguage: Language = useSelector(selectUserLanguage);
  return (
    // onClick={() => logOutClickHandler()} {translation[userLanguage]["LogOut"]}
    <Button> Log out </Button>
  );
}
