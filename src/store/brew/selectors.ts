import { RootState } from "../types";

export const selectBrew = (state: RootState) => state.brew.brew;
export const selectBrewStage = (state: RootState) => state.brew.stage;
