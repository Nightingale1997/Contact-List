import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  Snackbar,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Contact } from "./contactListAPI";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { sendContact } from "../contactForm/contactFormAPI";
import { setFormError } from "../contactForm/contactFormSlice";

interface ContactProps {
  contact: Contact;
}

export function EditContactEntry({ contact }: ContactProps) {
  const dispatch = useAppDispatch();
  const [contactName, setContactName] = useState<string>(contact.name);
  const [contactAddress, setContactAddress] = useState<string>(contact.address);
  const [contactPhone, setContactPhone] = useState<string>(contact.phone);
  const [contactImage, setContactImage] = useState<string>(
    contact.image ? contact.image : ""
  );
  const [contactNameError, setContactNameError] = useState(false);
  const [contactAddressError, setContactAddressError] = useState(false);
  const [contactPhoneError, setContactPhoneError] = useState(false);
  const focusRef = useRef<HTMLInputElement>(null);

  const updateContactName = (name: string) => {
    setContactName(name);
  };

  const updateContactAddress = (address: string) => {
    setContactAddress(address);
  };

  const updateContactPhoneNumber = (phoneNumber: string) => {
    setContactPhone(phoneNumber);
  };

  const submitForm = () => {
    dispatch(setFormError(false));

    if (validateForm()) {
      dispatch(
        sendContact(
          contactName,
          contactAddress,
          contactPhone,
          contact.id,
          contactImage
        )
      );
      setContactName("");
      setContactAddress("");
      setContactPhone("");

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
    <Stack spacing={1} sx={{ pb: 2, pt: 2 }}>
      <TextField
        size="small"
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
        size="small"
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
        size="small"
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
        size="small"
        value={contactImage}
        onChange={(e) => setContactImage(e.target.value)}
        id="outlined-basic"
        label="Image URL"
        variant="outlined"
        onKeyPress={(e) => handleFormKeyPress(e)}
      />
      <Button variant="contained" onClick={submitForm} size="small">
        Update Contact
      </Button>
    </Stack>
  );
}
