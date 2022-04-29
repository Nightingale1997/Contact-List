import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { getContacts } from "../contactList/contactListAPI";
import { setFormError } from "./contactFormSlice";

export const sendContact =
  (
    name: string,
    address: string,
    phone: string,
    id?: number,
    image?: string
  ): ThunkAction<void, unknown, unknown, AnyAction> =>
  async (dispatch) => {
    fetch(`http://localhost:21111/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        address: address,
        phone: phone,
        image: image,
      }),
    })
      .then(() => dispatch(getContacts()))
      .catch((error) => {
        console.error(error);
        dispatch(setFormError(true));
      });
  };
