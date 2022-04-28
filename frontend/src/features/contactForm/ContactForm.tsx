import {
  Alert,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { sendContact } from "./contactFormAPI";
import { setFormError } from "./contactFormSlice";

export function ContactForm() {
  const darkMode = useAppSelector((state) => state.container.darkMode);
  const dispatch = useAppDispatch();
  const [contactName, setContactName] = useState<string>("");
  const [contactAddress, setContactAddress] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactImage, setContactImage] = useState<string>("");
  const [contactNameError, setContactNameError] = useState(false);
  const [contactAddressError, setContactAddressError] = useState(false);
  const [contactPhoneError, setContactPhoneError] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);

  //Fetch locally saved form data
  useEffect(() => {
    const savedName = localStorage.getItem("contactName");
    const savedAddress = localStorage.getItem("contactAddress");
    const savedPhone = localStorage.getItem("contactPhone");
    const savedImage = localStorage.getItem("contactImage");

    if (savedName) {
      setContactName(savedName);
    }
    if (savedAddress) {
      setContactAddress(savedAddress);
    }
    if (savedPhone) {
      setContactPhone(savedPhone);
    }
    if (savedImage) {
      setContactImage(savedImage);
    }
  }, []);

  const updateContactName = (name: string) => {
    setContactName(name);
    localStorage.setItem("contactName", name);
  };

  const updateContactAddress = (address: string) => {
    setContactAddress(address);
    localStorage.setItem("contactAddress", address);
  };

  const updateContactPhoneNumber = (phoneNumber: string) => {
    setContactPhone(phoneNumber);
    localStorage.setItem("contactPhone", phoneNumber);
  };

  const updateContactImage = (imageURL: string) => {
    setContactImage(imageURL);
    localStorage.setItem("contactImage", imageURL);
  };

  const handleContactNameChange = (value: string) => {
    setContactName(value);
  };

  const submitForm = () => {
    dispatch(setFormError(false));

    if (validateForm()) {
      dispatch(
        sendContact(
          contactName,
          contactAddress,
          contactPhone,
          undefined,
          contactImage
        )
      );
      setContactName("");
      setContactAddress("");
      setContactPhone("");
      setContactImage("");

      localStorage.setItem("contactName", "");
      localStorage.setItem("contactAddress", "");
      localStorage.setItem("contactPhone", "");
      localStorage.setItem("contactImage", "");

      focusRef.current?.focus();
    }
  };

  const validateForm = () => {
    if (!contactName) {
      setContactNameError(true);
      return false;
    } else {
      setContactNameError(false);
    }

    if (!contactAddress) {
      setContactAddressError(true);
      return false;
    } else {
      setContactAddressError(false);
    }

    if (!contactPhone) {
      setContactPhoneError(true);
      return false;
    } else {
      setContactPhoneError(false);
    }

    return true;
  };

  const handleFormKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      submitForm();
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
      }}
      variant={darkMode ? undefined : "outlined"}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Add Contact</Typography>
        <TextField
          inputRef={focusRef}
          autoFocus
          value={contactName}
          onChange={(e) => updateContactName(e.target.value)}
          error={contactNameError}
          helperText={contactNameError ? "Please fill in this field" : ""}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onKeyPress={(e) => handleFormKeyPress(e)}
        />
        <TextField
          value={contactAddress}
          onChange={(e) => updateContactAddress(e.target.value)}
          error={contactAddressError}
          helperText={contactAddressError ? "Please fill in this field" : ""}
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          onKeyPress={(e) => handleFormKeyPress(e)}
        />
        <TextField
          value={contactPhone}
          onChange={(e) => updateContactPhoneNumber(e.target.value)}
          error={contactPhoneError}
          helperText={contactPhoneError ? "Please fill in this field" : ""}
          id="outlined-basic"
          label="Phone"
          type="number"
          variant="outlined"
          onKeyPress={(e) => handleFormKeyPress(e)}
        />
        <TextField
          value={contactImage}
          onChange={(e) => updateContactImage(e.target.value)}
          id="outlined-basic"
          label="Image URL"
          variant="outlined"
          onKeyPress={(e) => handleFormKeyPress(e)}
        />
        <Button variant="contained" onClick={submitForm}>
          Add Contacts
        </Button>
      </Stack>
    </Card>
  );
}
