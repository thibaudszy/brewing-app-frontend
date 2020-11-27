import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUserId } from "../user/selectors";

import { appLoading } from "../appState/actions";

export const SET_MY_RECIPES = "SET_MY_RECIPES";

export const getUserRecipes = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const userRecipesRequest = await Axios.get(`${apiUrl}/users/library`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      const userRecipes = userRecipesRequest.data;

      dispatch({
        type: SET_MY_RECIPES,
        payload: userRecipes,
      });
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
