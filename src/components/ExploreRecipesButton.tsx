import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { selectUserLanguage } from "../store/user/selectors";
import { useSelector } from "react-redux";
import translation from "../pages/MyRecipes/translation";

export default function ExploreRecipesButton() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const history = useHistory();
  const { t_import_recipe } = translation[userLanguage];

  return (
    <Button
      className="MyRecipes-buttons"
      onClick={() => history.push("/explore-recipes")}
    >
      {" "}
      {t_import_recipe}
    </Button>
  );
}
