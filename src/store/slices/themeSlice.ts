import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { RootState } from "../index";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem("themeMode") as ThemeMode) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

const selectThemeState = (state: RootState) => state.theme;

export const selectThemeMode = createSelector(
  selectThemeState,
  (themeState) => themeState.mode
);

export const selectIsDarkMode = createSelector(
  selectThemeMode,
  (mode) => mode === "dark"
);

export default themeSlice.reducer;
