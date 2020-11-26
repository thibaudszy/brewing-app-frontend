import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { selectUserLanguage } from "../../store/user/selectors";
import translation from "./translation";
import { useSelector } from "react-redux";

export default function LoggedOutItems() {
  const history = useHistory();
  const loginClickHandler = () => {
    history.push("/login");
  };
  const signUpClickHandler = () => {
    history.push("/signup");
  };
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { LogIn, SignUp } = translation[userLanguage];
  return (
    <div>
      <Button
        style={{ marginRight: "1em" }}
        onClick={() => loginClickHandler()}
      >
        {LogIn}
      </Button>
      <Button
        style={{ marginRight: "1em" }}
        onClick={() => signUpClickHandler()}
      >
        {" "}
        {SignUp}{" "}
      </Button>
    </div>
  );
}
