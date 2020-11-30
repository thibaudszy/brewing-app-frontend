import emptyRecipe from "../../pages/RecipePage/emptyRecipe";
import {
  SET_MY_RECIPES,
  SET_IMPORTABLE_RECIPES,
  IMPORT_RECIPE,
  REMOVE_RECIPE,
  UPDATE_NEW_RECIPE,
  UPDATE_NEW_RECIPE_ARRAYS,
} from "./actions";

interface RecipeState {
  myRecipes: Recipe[];
  importableRecipes: Recipe[];
  newRecipe: FullRecipe;
}

const initialState: RecipeState = {
  myRecipes: [],
  importableRecipes: [],
  newRecipe: { ...emptyRecipe },
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MY_RECIPES:
      return { ...state, myRecipes: payload };
    case SET_IMPORTABLE_RECIPES:
      return { ...state, importableRecipes: payload };
    case IMPORT_RECIPE: {
      const { importableRecipes, myRecipes } = state;
      const recipeToImport = importableRecipes.find(
        (recipe) => recipe.id === payload
      );
      const updatedImportableRecipes = importableRecipes.filter(
        (recipe) => recipe.id !== payload
      );
      const updatedMyRecipes = [...myRecipes, recipeToImport];
      return {
        ...state,
        myRecipes: updatedMyRecipes,
        importableRecipes: updatedImportableRecipes,
      };
    }
    case REMOVE_RECIPE: {
      const { importableRecipes, myRecipes } = state;
      const recipeToRemove = myRecipes.find((recipe) => recipe.id === payload);
      const updatedMyRecipes = myRecipes.filter(
        (recipe) => recipe.id !== payload
      );
      const updatedImportableRecipes = [...importableRecipes, recipeToRemove];
      return {
        ...state,
        myRecipes: updatedMyRecipes,
        importableRecipes: updatedImportableRecipes,
      };
    }
    case UPDATE_NEW_RECIPE: {
      return {
        ...state,
        newRecipe: { ...state.newRecipe, [payload.param]: payload.value },
      };
      //return state;
    }
    case UPDATE_NEW_RECIPE_ARRAYS: {
      const { newRecipe } = state;
      const { array, index: targetIndex, key, value } = payload;

      const updatedArray = newRecipe.maltAdditions.map(
        (arrayElement, index) => {
          console.log(targetIndex);
          if (targetIndex === index) {
            return { ...arrayElement, [key]: value };
          }
          return arrayElement;
        }
      );

      return {
        ...state,
        newRecipe: { ...state.newRecipe, maltAdditions: updatedArray },
      };
    }

    default:
      return state;
  }
};
