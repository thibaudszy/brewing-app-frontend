import Axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { AppThunk } from "../types";
import { selectToken } from "../user/selectors";
import { selectBrew } from "./selectors";

export const SET_NEW_BREW = "SET_NEW_BREW";
export const UPDATE_BREW_DATA = "UPDATE_BREW_DATA";

export const createNewBrew = (
  recipeId: number,
  brewLengthInL: number
): AppThunk => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const serverResponse = await Axios.post(
        `${apiUrl}/brews`,
        {
          recipeId,
          brewLengthInL,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: SET_NEW_BREW,
        payload: serverResponse.data,
      });
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(appDoneLoading());
      dispatch(showMessageWithTimeout("danger", true, "request failed"));
    }
  };
};

export const updateBrew = (
  newStage: string,
  key: string,
  updatedValue: string | number | Date
): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const brewId = selectBrew(getState()).id;
      const token = selectToken(getState());
      const serverResponse = await Axios.put(
        `${apiUrl}/brews/${brewId}`,
        {
          key: key,
          updatedValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("serverResponse", serverResponse);
      if (serverResponse.status === 200) {
        dispatch({
          type: UPDATE_BREW_DATA,
          payload: {
            newStage: newStage,
            key,
            updatedValue,
          },
        });
      } else {
        throw new Error("error");
      }
    } catch (e) {
      dispatch(showMessageWithTimeout("danger", true, "request failed"));
    }
  };
};

export const fetchLastbrew = (): AppThunk => async (dispatch, getState) => {
  const token = selectToken(getState());
  dispatch(appLoading());
  const lastBrew = await Axios.get(`${apiUrl}/brews/lastbrew`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({
    type: SET_NEW_BREW,
    payload: lastBrew.data,
  });
  dispatch(appDoneLoading());
};
