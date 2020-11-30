import Axios, { AxiosResponse } from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUserId } from "../user/selectors";
import { ThunkAction } from "redux-thunk";
import { AppThunk } from "../types";

import { appDoneLoading, appLoading } from "../appState/actions";
import { disconnect } from "process";

export const SET_MY_RECIPES = "SET_MY_RECIPES";
export const SET_IMPORTABLE_RECIPES = "SET_IMPORTABLE_RECIPES";
export const IMPORT_RECIPE = "IMPORT_RECIPE";
export const REMOVE_RECIPE = " REMOVE_RECIPE";
export const UPDATE_NEW_RECIPE = "UPDATE_NEW_RECIPE";
export const UPDATE_NEW_RECIPE_ARRAYS = "UPDATE_NEW_RECIPE_ARRAYS";

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
  array: "maltAdditions" | "hopAdditions" | "mashSteps",
  index: number,
  key: string,
  value: string | number
): Action => {
  console.log("payload:", { array, index, key, value });
  return {
    type: UPDATE_NEW_RECIPE_ARRAYS,
    payload: { array, index, key, value },
  };
};
