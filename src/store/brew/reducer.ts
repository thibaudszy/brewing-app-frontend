import { Reducer } from "react";
import { SET_NEW_BREW, UPDATE_BREW_DATA } from "./actions";

const initialState = {
  stage: "ingredients",
  brew: {},
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  console.log("payload brew", payload);
  switch (type) {
    case SET_NEW_BREW:
      return { ...state, brew: payload };
    case UPDATE_BREW_DATA: {
      const { newStage, key, updatedValue } = payload;
      return {
        ...state,
        stage: newStage,
        brew: { ...state.brew, [key]: updatedValue },
      };
    }

    default:
      return state;
  }
};
