import Axios, { AxiosResponse } from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUserId } from "../user/selectors";
import { ThunkAction } from "redux-thunk";
import { AppThunk } from "../types";

import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { disconnect } from "process";
import { calculateOG } from "../../BrewingCalculations";

export const SET_MY_RECIPES = "SET_MY_RECIPES";
export const SET_IMPORTABLE_RECIPES = "SET_IMPORTABLE_RECIPES";
export const IMPORT_RECIPE = "IMPORT_RECIPE";
export const REMOVE_RECIPE = " REMOVE_RECIPE";
export const UPDATE_NEW_RECIPE = "UPDATE_NEW_RECIPE";
export const UPDATE_NEW_RECIPE_MALTADDITIONS =
  "UPDATE_NEW_RECIPE_MALTADDITIONS";
export const ADD_NEW_MALT_NEW_RECIPE = "ADD_NEW_MALT_NEW_RECIPE";
export const REMOVE_NEW_MALT_NEW_RECIPE = "REMOVE_NEW_MALT_NEW_RECIPE";
export const REMOVE_NEW_HOP_NEW_RECIPE = "REMOVE_NEW_HOP_NEW_RECIPE";
export const ADD_NEW_HOP_NEW_RECIPE = "ADD_NEW_HOP_NEW_RECIPE";
export const UPDATE_NEW_RECIPE_HOPADDITIONS = "UPDATE_NEW_RECIPE_HOPADDITIONS";
export const REMOVE_MASH_STEP_NEW_RECIPE = "REMOVE_MASH_STEP_NEW_RECIPE";
export const ADD_MASH_STEP_NEW_RECIPE = "ADD_MASH_STEP_NEW_RECIPE";
export const UPDATE_NEW_RECIPE_MASH_STEPS = " UPDATE_NEW_RECIPE_MASH_STEPS";
export const UPDATE_COMMENT_NEW_RECIPE = "UPDATE_COMMENT_NEW_RECIPE";
export const SET_FULL_RECIPE = "SET_FULL_RECIPE";

export const getUserRecipes = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const userRecipesRequest: AxiosResponse = await Axios.get(
        `${apiUrl}/users/library`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userRecipes = userRecipesRequest.data;
      //console.log("loaded recipes:", userRecipes);
      dispatch({
        type: SET_MY_RECIPES,
        payload: userRecipes,
      });
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          variant: "danger",
          dismissable: true,
          text: "request failed",
        },
      });
    }
  };
};

export const getImportableRecipes = (): AppThunk => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const responseFromServer: AxiosResponse = await Axios.get(
        `${apiUrl}/recipes/not-in-library`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const importableRecipes = responseFromServer.data;

      dispatch({
        type: SET_IMPORTABLE_RECIPES,
        payload: importableRecipes,
      });
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          variant: "danger",
          dismissable: true,
          text: "request failed",
        },
      });
    }
  };
};

export const addRecipeToLibrary = (recipeId: number): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const serverResponse: AxiosResponse = await Axios.post(
      `${apiUrl}/libraries`,
      {
        recipeId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!(serverResponse.status === 200)) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          variant: "danger",
          dismissable: true,
          text: "request failed",
        },
      });
      return;
    }
    dispatch({
      type: IMPORT_RECIPE,
      payload: recipeId,
    });
  };
};

export const removeRecipeFromLibrary = (recipeId: number): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const userId = selectUserId(getState());
    console.log(userId, recipeId);
    const serverResponse: AxiosResponse = await Axios.delete(
      `${apiUrl}/libraries/${userId}${recipeId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("server response:", serverResponse);
    if (!(serverResponse.status === 200)) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          variant: "danger",
          dismissable: true,
          text: "request failed",
        },
      });
      return;
    }
    dispatch({
      type: REMOVE_RECIPE,
      payload: recipeId,
    });
  };
};

export const updateNewBeerData = (param: string, data: any): Action => {
  console.log("param:", param, "value", data);

  return {
    type: UPDATE_NEW_RECIPE,
    payload: { param, value: data.values },
  };
};

export const updateNewBeerArrays = (
  array: KeyArray,
  index: number,
  key: string,
  value: string | number
): Action => {
  console.log("payload:", { array, index, key, value });
  return {
    type: UPDATE_NEW_RECIPE_MALTADDITIONS,
    payload: { array, index, key, value },
  };
};
export const updateNewBeerHopAdditions = (
  index: number,
  key: string,
  value: number | string,
  isDryHop: boolean
): Action => {
  return {
    type: UPDATE_NEW_RECIPE_HOPADDITIONS,
    payload: { index, key, value, isDryHop },
  };
};
export const AddNewMaltToNewRecipe = () => {
  return {
    type: ADD_NEW_MALT_NEW_RECIPE,
  };
};

export const removeNewMaltToNewRecipe = () => {
  return {
    type: REMOVE_NEW_MALT_NEW_RECIPE,
  };
};
export const removeNewHopFromNewRecipe = (isDryHop: boolean) => {
  return {
    type: REMOVE_NEW_HOP_NEW_RECIPE,
    payload: isDryHop,
  };
};
export const AddNewHopToNewRecipe = (isDryHop: boolean) => {
  return {
    type: ADD_NEW_HOP_NEW_RECIPE,
    payload: isDryHop,
  };
};
export const removeMashStepFromNewRecipe = () => {
  return {
    type: REMOVE_MASH_STEP_NEW_RECIPE,
  };
};
export const AddNewMashStepToNewRecipe = () => {
  return {
    type: ADD_MASH_STEP_NEW_RECIPE,
  };
};

export const updateNewBeerMashSteps = (
  index: number,
  key: string,
  value: number | string
): Action => {
  return {
    type: UPDATE_NEW_RECIPE_MASH_STEPS,
    payload: { index, key, value },
  };
};
export const updateComment = (comment: string) => {
  return {
    type: UPDATE_COMMENT_NEW_RECIPE,
    payload: comment,
  };
};
export const fetchFullRecipe = (recipeId: number): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const recipeRequest: AxiosResponse = await Axios.get(
        `${apiUrl}/recipes/recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fullRecipe: FullRecipe = recipeRequest.data;
      return {
        type: SET_FULL_RECIPE,
        payload: fullRecipe,
      };
    } catch (e) {
      dispatch({
        type: "SET_MESSAGE",
        payload: {
          variant: "danger",
          dismissable: true,
          text: "request failed",
        },
      });
    }
  };
};
export const submitNewRecipe = (newRecipe: FullRecipe): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const recipeToPost = {
        ...newRecipe,
        OGinPlato: calculateOG(newRecipe.ABV, newRecipe.FGinPlato),
      };
      const token = selectToken(getState());
      dispatch(appLoading());
      const serverResponse = await Axios.post(
        `${apiUrl}/recipes`,
        {
          recipeToPost,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("server response", serverResponse);
      dispatch(appDoneLoading());
      dispatch(showMessageWithTimeout("sucess", true, "recipe created"));
    } catch (e) {
      dispatch(showMessageWithTimeout("danger", true, "request failed"));
    }
  };
};
