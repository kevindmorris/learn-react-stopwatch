import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Component } from "./components";

export default function App() {
  return (
    <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
      <CssBaseline />
      <Component />
    </ThemeProvider>
  );
}
