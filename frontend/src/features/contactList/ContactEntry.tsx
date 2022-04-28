import React, { useState } from "react";
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemText,
  Snackbar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Contact, deleteContact } from "./contactListAPI";
import { EditContactEntry } from "./EditContactEntry";
import { useAppDispatch } from "../../app/hooks";

interface ContactProps {
  contact: Contact;
}

export function ContactEntry({ contact }: ContactProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment key={"Fragment" + contact.name + contact.phone}>
      {" "}
      <Grid container alignItems="center" justifyContent={"space-around"}>
        <Grid item xs={12} sm={8} md={12} lg={8}>
          {showEditForm ? (
            <EditContactEntry contact={contact} />
          ) : (
            <ListItemText
              primary={contact.name}
              secondary={
                <React.Fragment>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent={"flex-start"}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{ display: "flex" }}
                      justifyContent="center"
                    >
                      <Avatar
                        alt="Cindy Baker"
                        src={contact.image ? contact.image : ""}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {contact.address + " - "}
                      </Typography>

                      {contact.phone}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            />
          )}
        </Grid>
        <Grid item xs={3} md={6} lg={3}>
          <IconButton
            sx={{ pt: 0 }}
            aria-label="Edit"
            onClick={() => setShowEditForm(!showEditForm)}
          >
            {showEditForm ? <CloseIcon /> : <EditIcon />}
          </IconButton>
          <IconButton
            sx={{ pt: 0 }}
            aria-label="delete"
            onClick={() => dispatch(deleteContact(contact.id))}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </React.Fragment>
  );
}
