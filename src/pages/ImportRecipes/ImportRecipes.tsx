import React, { useEffect } from "react";
import { CardGroup, Jumbotron } from "react-bootstrap";
import translation from "./translation";

import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

import { getImportableRecipes } from "../../store/recipes/actions";
import { selectImportableRecipes } from "../../store/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import MyRecipesButton from "../../components/MyRecipesButton";
import RecipeCalculatorButton from "../../components/RecipeCalculatorButton";

export default function ImportRecipes() {
  const userLanguage: Language = useSelector(selectUserLanguage);

  const { t_explore_recipes, t_no_more_recipes } = translation[userLanguage];
  const importableRecipes = useSelector(selectImportableRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImportableRecipes());
  }, [dispatch]);

  return (
    <div className="my-recipes">
      <div className="buttons-row">
        <RecipeCalculatorButton />
        <MyRecipesButton />
      </div>
      <Jumbotron fluid>
        <h2>{t_explore_recipes}</h2>
      </Jumbotron>
      {!importableRecipes.length ? (
        <h1>{t_no_more_recipes}</h1>
      ) : (
        <CardGroup>
          {importableRecipes.map((recipe: RecipeWithAuthorName) => {
            const { id } = recipe;
            return <RecipeCard recipe={recipe} isInLibrary={false} key={id} />;
          })}
        </CardGroup>
      )}
    </div>
  );
}
