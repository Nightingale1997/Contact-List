import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpawnSyncOptionsWithBufferEncoding } from "child_process";
import { RootState, AppThunk } from "../../app/store";

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
