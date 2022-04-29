import React, { useState } from "react";
import { ContactList } from "../contactList/ContactList";
import {
  Alert,
  Box,
  Grid,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ContactForm } from "../contactForm/ContactForm";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleDarkMode } from "./contactContainerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFormError } from "../contactForm/contactFormSlice";

export function ContactContainer() {
  const [alignment, setAlignment] = useState(false);
  const dispatch = useAppDispatch();

  const snackBarOpen = useAppSelector((state) => state.contactForm.formError);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean
  ) => {
    if (newAlignment !== alignment && newAlignment !== null) {
      setAlignment(newAlignment);
      dispatch(toggleDarkMode());
    }
  };

  return (
    <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => dispatch(setFormError(false))}
      >
        <Alert
          onClose={() => dispatch(setFormError(false))}
          severity="error"
          sx={{ width: "100%" }}
        >
          Server Error: Failed to update contact list
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%",
        }}
      >
        <Grid item xs={12}>
          {" "}
          <Typography variant="h4" sx={{ m: 2 }}>
            Contact List
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value={false}>
              <Brightness7Icon />
            </ToggleButton>
            <ToggleButton value={true}>
              <Brightness4Icon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={10} md={4}>
          <ContactForm />
        </Grid>
        <Grid item xs={10} md={4}>
          <ContactList />
        </Grid>
      </Grid>
    </Box>
  );
}
