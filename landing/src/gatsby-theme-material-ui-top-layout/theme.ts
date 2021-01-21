import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"

// Hardcode type for now.
// To be honest, I'm not yet sure how to dynamically change palette types with
// Gatsby + MaterialUI.
const type = "light"

// A custom theme for this app.
// Will be injected to all components using `useStyles` by the material plugin.
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: type,
      primary: {
        light: "#CCC5B9", // light is the same color as main but with less opacity
        main: "#252422",
        dark: "#0F1517",
        contrastText: "#FFFCF2",
      },
      secondary: {
        light: "#D7B49E",
        main: "#CE4257",
        dark: "#720026",
        contrastText: "#FFFCF2",
      },
      common: {
        black: "#000",
        white: "#fff",
      },
      background: {
        paper: type === "dark" ? "#252422" : "#F4F2EF",
        default: type === "dark" ? "#000" : "#F2E5E4",
      },
      error: {
        light: "#e57373",
        main: "#CE4257",
        dark: "#d32f2f",
        contrastText: "#fff",
      },
      warning: {
        light: "#ffb74d",
        main: "#ff9800",
        dark: "#f57c00",
        contrastText: "#rgba(0, 0, 0, 0.87",
      },
      info: {
        light: "#64b5f6",
        main: "#2196f3",
        dark: "#1976d2",
        contrastText: "#fff",
      },
      success: {
        light: "#81c784",
        main: "#4caf50",
        dark: "#388e3c",
        contrastText: "#rgba(0, 0, 0, 0.87",
      },
      text: {
        primary: type === "dark" ? "#fff" : "#252422",
        secondary: type === "dark" ? "#fff" : "#403D39",
        disabled: "rgba(133, 30, 30, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
    },
    typography: {
      fontFamily: "Libre Baskerville, serif",
      fontSize: 14,
    },
    // Below override material ui default classes
    // Background of the app should resemble an old newspaper
    // This is achieved by adding darker shadows on the sides of the page
    // And using a transparent noise texture found here:
    // https://www.transparenttextures.com/
    overrides: {
      MuiCssBaseline: {
        "@global": {
          body: {
            minHeight: "100vh",
            minWidth: "100%",
            backgroundColor: "#F2E5D4",
            boxShadow: "2px 3px 20px black, 0 0 100px #a89782 inset",
            /* This is mostly intended for prototyping; please download the pattern and re-host for production */
            backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png'), 
                            url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
          },
        },
      },
    },
  })
)

export default theme
