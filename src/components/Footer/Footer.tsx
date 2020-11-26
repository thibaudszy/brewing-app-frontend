import React from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeLanguageAction } from "../../store/user/actions";

export default function MyFooter() {
  const dispatch = useDispatch();
  function changeLanguage(language: Language) {
    console.log("lang", changeLanguageAction(language));
    dispatch(changeLanguageAction(language));
  }
  return (
    <div
      style={{
        backgroundColor: "light",
        fontSize: "20px",
        color: "white",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
      }}
    >
      <Button
        style={{ marginRight: "1em" }}
        onClick={() => changeLanguage("En-GB")}
      >
        {" "}
        English
      </Button>
      <Button onClick={() => changeLanguage("Fr-FR")}> Français</Button>
    </div>
  );
}
