import { createSlice } from "@reduxjs/toolkit";

export interface ContactContainerState {
  darkMode: boolean;
}

const initialState: ContactContainerState = {
  darkMode: false,
};

export const contactContainerSlice = createSlice({
  name: "contactContainerSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = contactContainerSlice.actions;

export default contactContainerSlice.reducer;
