export const selectToken = (state: any) => {
  return state.user.token;
};

export const selectUser = (state: any) => state.user;

export const selectUserLanguage = (state: any) => state.user.language;
