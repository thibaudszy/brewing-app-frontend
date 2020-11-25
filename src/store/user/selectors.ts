export const selectToken = (state: any) => {
  console.log("state:", state);
  return state.user.token;
};

export const selectUser = (state: any) => state.user;
