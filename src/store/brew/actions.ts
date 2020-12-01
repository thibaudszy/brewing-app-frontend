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
export const SET_TIME_START_MASH = "SET_TIME_START_MASH";

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

export const startMash = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const now = new Date();
      const brewId = selectBrew(getState()).id;
      const token = selectToken(getState());
      const serverResponse = await Axios.put(
        `${apiUrl}/brews/${brewId}`,
        {
          key: "timeStartMash",
          updatedValue: now,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("serverResponse", serverResponse);
      if (serverResponse.status === 200) {
        dispatch({
          type: SET_TIME_START_MASH,
          payload: now,
        });
      } else {
        throw "error";
      }
    } catch (e) {
      dispatch(showMessageWithTimeout("danger", true, "request failed"));
    }
  };
};
