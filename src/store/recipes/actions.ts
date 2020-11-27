import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUserId } from "../user/selectors";

import { appDoneLoading, appLoading } from "../appState/actions";

export const SET_MY_RECIPES = "SET_MY_RECIPES";

export const getUserRecipes = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const userRecipesRequest = await Axios.get(`${apiUrl}/users/library`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

export const getRecipeById = (recipeId: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const recipeRequest = await Axios.get(
        `${apiUrl}/recipes/recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(appDoneLoading());
      const recipe = recipeRequest.data;
      console.log("loaded recipes:", recipe);
      return recipe;
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
