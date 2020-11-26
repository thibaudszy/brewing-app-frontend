import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function LoggedOutItems() {
  const history = useHistory();
  const loginClickHandler = () => {
    history.push("/login");
  };

  return (
    <div>
      <Button
        style={{ marginRight: "1em" }}
        onClick={() => loginClickHandler()}
      >
        {" "}
        Log in{" "}
      </Button>
      <Button style={{ marginRight: "1em" }}> Sign up </Button>
    </div>
  );
}
