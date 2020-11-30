import MaltAdditionsRow from "../../pages/RecipeCalculator/MaltAdditionsRow";
import emptyRecipe from "../../pages/RecipePage/emptyRecipe";
import {
  SET_MY_RECIPES,
  SET_IMPORTABLE_RECIPES,
  IMPORT_RECIPE,
  REMOVE_RECIPE,
  UPDATE_NEW_RECIPE,
  UPDATE_NEW_RECIPE_ARRAYS as UPDATE_NEW_RECIPE_MALTADDITIONS,
  ADD_NEW_MALT_NEW_RECIPE,
  REMOVE_NEW_MALT_NEW_RECIPE,
  ADD_NEW_HOP_NEW_RECIPE,
  REMOVE_NEW_HOP_NEW_RECIPE,
  UPDATE_NEW_RECIPE_HOPADDITIONS,
  REMOVE_MASH_STEP_NEW_RECIPE,
  ADD_MASH_STEP_NEW_RECIPE,
  UPDATE_NEW_RECIPE_MASH_STEPS,
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
  console.log("action type", type);
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
    case UPDATE_NEW_RECIPE_MALTADDITIONS: {
      const { newRecipe } = state;
      const { array, index: targetIndex, key, value } = payload;

      const updatedArray = newRecipe.maltAdditions.map(
        (arrayElement, index) => {
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

    case ADD_NEW_MALT_NEW_RECIPE: {
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe,
          maltAdditions: [...state.newRecipe.maltAdditions, {}],
        },
      };
    }
    case REMOVE_NEW_MALT_NEW_RECIPE: {
      const maltAdditionsNewRecipe = state.newRecipe.maltAdditions;
      if (maltAdditionsNewRecipe.length > 1) {
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            maltAdditions: maltAdditionsNewRecipe.slice(
              0,
              maltAdditionsNewRecipe.length - 1
            ),
          },
        };
      }
      return state;
    }

    case ADD_NEW_HOP_NEW_RECIPE: {
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe,
          hopAdditions: [...state.newRecipe.hopAdditions, { isDryop: payload }],
        },
      };
    }
    case REMOVE_NEW_HOP_NEW_RECIPE: {
      const hopAdditionsNewRecipe = state.newRecipe.hopAdditions;
      const filteredHopAdditions = hopAdditionsNewRecipe.filter(
        (hopAddition) => hopAddition.isDryHop === payload
      );

      const otherHopAdditions = hopAdditionsNewRecipe.filter(
        (hopAddition) => hopAddition.isDryHop !== payload
      );
      // console.log("filtered hop additions:", filteredHopAdditions);
      // console.log("other hop additions", otherHopAdditions);
      if (hopAdditionsNewRecipe.length > 1) {
        return {
          ...state,
          newRecipe: {
            ...state.newRecipe,
            hopAdditions: [
              ...filteredHopAdditions,
              ...otherHopAdditions.slice(0, hopAdditionsNewRecipe.length - 1),
            ],
          },
        };
      }
      return state;
    }
    case UPDATE_NEW_RECIPE_HOPADDITIONS: {
      const { newRecipe } = state;
      const { index: targetIndex, key, value } = payload;

      const updatedArray = newRecipe.hopAdditions.map((arrayElement, index) => {
        if (targetIndex === index) {
          return { ...arrayElement, [key]: value };
        }
        return arrayElement;
      });

      return {
        ...state,
        newRecipe: { ...state.newRecipe, hopAdditions: updatedArray },
      };
    }
    case ADD_MASH_STEP_NEW_RECIPE: {
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe,
          mashSteps: [...state.newRecipe.mashSteps, {}],
        },
      };
    }
    case REMOVE_MASH_STEP_NEW_RECIPE: {
      const mashStepsNewRecipe = state.newRecipe.mashSteps;

      return {
        ...state,
        newRecipe: {
          ...state.newRecipe,
          mashSteps: mashStepsNewRecipe.slice(0, mashStepsNewRecipe.length - 1),
        },
      };
    }
    case UPDATE_NEW_RECIPE_MASH_STEPS: {
      const { newRecipe } = state;
      const { index: targetIndex, key, value } = payload;

      const updatedArray = newRecipe.mashSteps.map((arrayElement, index) => {
        if (targetIndex === index) {
          return { ...arrayElement, [key]: value };
        }
        return arrayElement;
      });

      return {
        ...state,
        newRecipe: { ...state.newRecipe, mashSteps: updatedArray },
      };
    }

    default:
      return state;
  }
};
