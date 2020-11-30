import { RootState } from "../types";

export const selectMyRecipes = (state: any) => state.recipes.myRecipes;
export const selectImportableRecipes = (state: any) =>
  state.recipes.importableRecipes;
export const selectNewRecipeMaltAdditions = (state: any) =>
  state.recipes.newRecipe.maltAdditions;
