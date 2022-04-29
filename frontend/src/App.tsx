import React from "react";
import "./App.css";
import { ContactContainer } from "./features/contactContainer/ContactContainer";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { useAppSelector } from "./app/hooks";

function App() {
  const darkMode = useAppSelector((state) => state.container.darkMode);

  const themeOptions: ThemeOptions = {
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <ContactContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
