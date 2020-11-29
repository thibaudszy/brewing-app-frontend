import {
  SET_MY_RECIPES,
  SET_IMPORTABLE_RECIPES,
  IMPORT_RECIPE,
  REMOVE_RECIPE,
} from "./actions";

interface RecipeState {
  myRecipes: Recipe[];
  importableRecipes: Recipe[];
}

const initialState: RecipeState = {
  myRecipes: [],
  importableRecipes: [],
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
        myRecipes: updatedMyRecipes,
        importableRecipes: updatedImportableRecipes,
      };
    }

    default:
      return state;
  }
};
