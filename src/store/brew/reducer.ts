import { Reducer } from "react";
import { SET_NEW_BREW, SET_TIME_START_MASH } from "./actions";

const initialState = {
  brew: {},
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  console.log("payload brew", payload);
  switch (type) {
    case SET_NEW_BREW:
      return payload;
    case SET_TIME_START_MASH: {
      return payload;
    }
    default:
      return state;
  }
};
