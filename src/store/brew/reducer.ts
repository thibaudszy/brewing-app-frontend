import { SET_NEW_BREW, UPDATE_BREW_DATA } from "./actions";

const initialState = {
  stage: "ingredients",
  brew: {},
};
// eslint-disable-next-line
export default (state = initialState, action: Action) => {
  const { type, payload } = action;

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
