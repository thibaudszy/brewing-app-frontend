import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
const loginSuccess = (userWithToken: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken: any) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => {
  console.log("in the log out action");
  return { type: LOG_OUT };
};

export const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  language: "En-GB" | "Fr-FR",
  gender: "male" | "female" | "other"
) => {
  return async (dispatch: any, getState: any) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        firstName,
        lastName,
        email,
        password,
        language,
        gender,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      // console.log("response:", response);

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        //  console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch: any, getState: any) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const changeLanguageAction = (language: Language): Action => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};
