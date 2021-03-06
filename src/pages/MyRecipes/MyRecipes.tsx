import React, { useEffect } from "react";
import { CardGroup, Jumbotron } from "react-bootstrap";
import translation from "./translation";

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

  const { t_my_recipes } = translation[userLanguage];
  const myRecipes = useSelector(selectMyRecipes) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserRecipes());
  }, [dispatch]);

  return (
    <div className="my-recipes">
      <Jumbotron fluid>
        <h2>{t_my_recipes}</h2>
        <div className="buttons-row">
          <RecipeCalculatorButton />
          <ExploreRecipesButton />
        </div>
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
