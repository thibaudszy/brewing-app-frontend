import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Error404() {
  const history = useHistory();
  return (
    <div
      className="Error404"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        It seems you got lost. This page does not exist
      </h1>
      <img
        src="https://i.kym-cdn.com/photos/images/original/001/042/619/4ea.jpg"
        alt="John Travolta lost"
      />
      <Button
        onClick={() => {
          history.push("/");
        }}
        style={{ margin: "1em" }}
      >
        {" "}
        Go to the home page
      </Button>
    </div>
  );
}
