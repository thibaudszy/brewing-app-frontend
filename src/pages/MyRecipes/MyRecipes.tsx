import React, { useEffect } from "react";
import { Button, CardGroup, Jumbotron } from "react-bootstrap";
import translation from "./translation";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import "./MyRecipes.css";
import { getUserRecipes } from "../../store/recipes/actions";
import { selectMyRecipes } from "../../store/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCalculatorButton from "../../components/RecipeCalculatorButton";
import ExploreRecipesButton from "../../components/ExploreRecipesButton";
export default function MyRecipes() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const history = useHistory();
  const { t_my_recipes, t_recipe_calculator, t_import_recipe } = translation[
    userLanguage
  ];
  const myRecipes = useSelector(selectMyRecipes) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRecipes());
  }, [dispatch]);
  console.log(myRecipes);
  return (
    <div className="my-recipes">
      <div className="buttons-row">
        <RecipeCalculatorButton />
        <ExploreRecipesButton />
      </div>
      <Jumbotron fluid>
        <h2>{t_my_recipes}</h2>
      </Jumbotron>
      <div>
        <CardGroup>
          {myRecipes.map((recipe: RecipeWithAuthorName) => {
            const { id } = recipe;
            return <RecipeCard recipe={recipe} isInLibrary={true} key={id} />;
          })}
        </CardGroup>
      </div>
    </div>
  );
}
