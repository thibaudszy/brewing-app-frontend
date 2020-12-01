import { Reducer } from "react";

const initialState = {
  brew: {},
};

export default (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    // case typeName:
    //     return { ...state, ...payload }

    default:
      return state;
  }
};
