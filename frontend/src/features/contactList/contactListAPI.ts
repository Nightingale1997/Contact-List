import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { setFormError } from "../contactForm/contactFormSlice";
import { setError, setLoading, setUsers } from "./contactListSlice";

export interface Contact {
  id: number;
  name: string;
  phone: string;
  address: string;
  image?: string;
}

export const getContacts =
  (): ThunkAction<void, unknown, unknown, AnyAction> => async (dispatch) => {
    dispatch(setError(false));
    dispatch(setLoading(true));
    fetch(`http://localhost:21111/users`)
      .then((response) => response.json())
      .then((data: Contact[]) => {
        dispatch(setUsers(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setLoading(false));
        dispatch(setError(true));
      });
  };

export const deleteContact =
  (id: number): ThunkAction<void, unknown, unknown, AnyAction> =>
  async (dispatch) => {
    fetch(`http://localhost:21111/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(() => dispatch(getContacts()))
      .catch((error) => {
        console.error(error);
        dispatch(setFormError(true));
      });
  };
