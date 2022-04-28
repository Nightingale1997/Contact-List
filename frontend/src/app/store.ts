import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import contactListReducer from "../features/contactList/contactListSlice";
import containerReducer from "../features/contactContainer/contactContainerSlice";
import contactFormReducer from "../features/contactForm/contactFormSlice";

export const store = configureStore({
  reducer: {
    contactList: contactListReducer,
    container: containerReducer,
    contactForm: contactFormReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
