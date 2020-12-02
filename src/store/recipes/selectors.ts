export const selectMyRecipes = (state: any) => state.recipes.myRecipes;
export const selectImportableRecipes = (state: any) =>
  state.recipes.importableRecipes;
export const selectNewRecipe = (state: any) => state.recipes.newRecipe;
export const selectNewRecipeMaltAdditions = (state: any) =>
  state.recipes.newRecipe.maltAdditions;
export const selectNewRecipeBoilHopAdditions = (state: any) =>
  state.recipes.newRecipe.hopAdditions.filter(
    (hopAddition: HopAddition) => !hopAddition.isDryHop
  );
export const selectNewRecipeMashSteps = (state: any) =>
  state.recipes.newRecipe.mashSteps;
export const selectNewRecipefermentatioData = (state: any) => {
  const {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    hopAdditions,
  } = state.recipes.newRecipe;
  const dryHops = hopAdditions.filter(
    (hopAddition: HopAddition) => hopAddition.isDryHop
  );

  return {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    dryHops,
  };
};
export const selectFullRecipe = (state: any) => {
  return state.recipes.fullRecipe;
};
