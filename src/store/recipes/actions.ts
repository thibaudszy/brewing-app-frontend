import Axios, { AxiosResponse } from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUserId } from "../user/selectors";
import { ThunkAction } from "redux-thunk";
import { AppThunk } from "../types";

import { appDoneLoading, appLoading } from "../appState/actions";

export const SET_MY_RECIPES = "SET_MY_RECIPES";

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
