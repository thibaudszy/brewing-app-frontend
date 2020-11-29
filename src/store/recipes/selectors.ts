//import { createSelector } from "reselect";

import { RootState } from "../types";

export const selectMyRecipes = (state: RootState) => state.recipes.myRecipes;

export const selectImportableRecipes = (state: RootState) =>
  state.recipes.importableRecipes;
