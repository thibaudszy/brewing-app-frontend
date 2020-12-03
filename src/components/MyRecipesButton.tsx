import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { selectUserLanguage } from "../store/user/selectors";
import { useSelector } from "react-redux";
import translation from "../pages/ImportRecipes/translation";

export default function MyRecipesButton() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const history = useHistory();
  const { t_my_recipes } = translation[userLanguage];

  return (
    <Button
      className="MyRecipes-buttons"
      onClick={() => history.push("/recipes")}
    >
      {" "}
      {t_my_recipes}
    </Button>
  );
}
