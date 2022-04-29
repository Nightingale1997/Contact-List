import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactFormState {
  formError: boolean;
}

const initialState: ContactFormState = {
  formError: false,
};

export const contactFormSlice = createSlice({
  name: "contactFormSlice",
  initialState,
  reducers: {
    setFormError: (state, action: PayloadAction<boolean>) => {
      state.formError = action.payload;
    },
  },
});

export const { setFormError } = contactFormSlice.actions;

export default contactFormSlice.reducer;
