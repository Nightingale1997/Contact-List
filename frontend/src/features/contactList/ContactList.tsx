import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Contact, getContacts } from "./contactListAPI";
import { ContactEntry } from "./ContactEntry";

export function ContactList() {
  const contacts: Contact[] = useAppSelector(
    (state) => state.contactList.users
  );
  const darkMode = useAppSelector((state) => state.container.darkMode);
  const loading: boolean = useAppSelector((state) => state.contactList.loading);
  const error: boolean = useAppSelector((state) => state.contactList.error);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  var filteredContacts = [...contacts];
  if (searchQuery) {
    filteredContacts = filteredContacts.filter(
      (contact) =>
        contact.name.toLocaleLowerCase().search(searchQuery) !== -1 ||
        contact.address.toLocaleLowerCase().search(searchQuery) !== -1 ||
        contact.phone.search(searchQuery) !== -1
    );
  }

  filteredContacts.sort(
    (a, b) => (sortAscending ? 1 : -1) * a.name.localeCompare(b.name)
  );

  return (
    <Card sx={{ pt: 2 }} variant={darkMode ? undefined : "outlined"}>
      <Grid container justifyContent={"space-around"}>
        <Grid item xs={12} sm={6} md={12} lg={6} sx={{ mb: 1 }}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLocaleLowerCase())}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            placeholder="Name, adress, phone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={4} sx={{ mb: 1 }}>
          <Button
            onClick={() => setSortAscending(!sortAscending)}
            variant="contained"
            endIcon={
              sortAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
            }
          >
            {sortAscending ? "Ascending" : "Descending"}
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <List sx={{ p: 0 }}>
        {loading ? (
          <Box
            sx={{
              width: 1,
              minHeight: 200,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <ContactEntry key={contact.id} contact={contact} />
          ))
        ) : error ? (
          <Box
            sx={{
              width: 1,
              minHeight: 200,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant={"h5"} sx={{ textAlign: "center" }}>
              Failed to fetch contacts from server
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: 1,
              minHeight: 200,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant={"h5"} sx={{ textAlign: "center" }}>
              No Contacts
            </Typography>
          </Box>
        )}
      </List>
    </Card>
  );
}
