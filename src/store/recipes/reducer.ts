import { SET_MY_RECIPES } from "./actions";

interface RecipeState {
  myRecipes: Recipe[] | null;
  allRecipes: Recipe[] | null;
}

const initialState: RecipeState = {
  myRecipes: null,
  allRecipes: null,
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MY_RECIPES:
      return { ...state, myRecipes: payload };

    default:
      return state;
  }
};
