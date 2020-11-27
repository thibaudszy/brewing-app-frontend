import React from "react";
import { Button } from "react-bootstrap";
import translation from "./translation";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import "./MyRecipes.css";

export default function MyRecipes() {
  const history = useHistory();
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_my_recipes, t_recipe_calculator, t_import_recipe } = translation[
    userLanguage
  ];

  return (
    <div className="my-recipes" style={{ width: "100%" }}>
      <div className="buttons-row">
        <Button className="MyRecipes-buttons"> {t_recipe_calculator}</Button>
        <Button className="MyRecipes-buttons"> {t_import_recipe}</Button>
      </div>
      <div className="section-title">
        <h2>{t_my_recipes}</h2>
      </div>
    </div>
  );
}
