import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";
import { Action } from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  firstName: null,
  lastName: null,
  email: null,
  language: "En-GB",
};

export default (state = initialState, action: Action) => {
  console.log("action:", action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      console.log("in the reducer to log out");
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
