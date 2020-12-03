import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeLanguageAction } from "../../store/user/actions";
import "./Footer.css";
export default function MyFooter() {
  const dispatch = useDispatch();
  function changeLanguage(language: Language) {
    dispatch(changeLanguageAction(language));
  }
  return (
    <div className="Footer">
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
