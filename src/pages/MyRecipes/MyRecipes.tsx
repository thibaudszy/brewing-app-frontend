import React, { useEffect } from "react";
import {
  Button,
  Card,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import translation from "./translation";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import "./MyRecipes.css";
import { getUserRecipes } from "../../store/recipes/actions";
import { selectMyRecipes } from "../../store/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function MyRecipes() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const history = useHistory();
  const {
    t_ABV,
    t_my_recipes,
    t_recipe_calculator,
    t_import_recipe,
    t_color,
    t_author,
    t_see_recipe,
  } = translation[userLanguage];
  const myRecipes = useSelector(selectMyRecipes) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRecipes());
  }, [dispatch]);

  return (
    <div className="my-recipes">
      <div className="buttons-row">
        <Button className="MyRecipes-buttons"> {t_recipe_calculator}</Button>
        <Button
          className="MyRecipes-buttons"
          onClick={() => history.push("/explore-recipes")}
        >
          {" "}
          {t_import_recipe}
        </Button>
      </div>
      <Jumbotron fluid>
        <h2>{t_my_recipes}</h2>
      </Jumbotron>
      <div style={{ display: "flex" }}>
        {myRecipes.map((recipe: RecipeWithAuthorName) => {
          const {
            id,
            imageURL,
            name,
            ABV,
            description,
            colorInEBC,
            author,
          } = recipe;
          return <RecipeCard recipe={recipe} isInLibrary={true} />;
        })}
      </div>
    </div>
  );
}
