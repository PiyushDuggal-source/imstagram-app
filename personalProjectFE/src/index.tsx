import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./globalStyles/style.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
          <App />
        </MantineProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
