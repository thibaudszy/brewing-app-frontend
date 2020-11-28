import { SET_MY_RECIPES, SET_IMPORTABLE_RECIPES } from "./actions";

interface RecipeState {
  myRecipes: Recipe[] | null;
  importableRecipes: Recipe[] | null;
}

const initialState: RecipeState = {
  myRecipes: null,
  importableRecipes: null,
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MY_RECIPES:
      return { ...state, myRecipes: payload };
    case SET_IMPORTABLE_RECIPES:
      return { ...state, importableRecipes: payload };

    default:
      return state;
  }
};
