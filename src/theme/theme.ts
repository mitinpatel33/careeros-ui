import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: `"Plus Jakarta Sans", "Inter", "Roboto", sans-serif`,

    h1: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    h2: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    h3: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    h4: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    h5: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    h6: { fontFamily: `"Plus Jakarta Sans", sans-serif` },
    button: {
      fontFamily: `"Plus Jakarta Sans", sans-serif`,
      textTransform: "none",
      fontWeight: 700,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `"Plus Jakarta Sans", "Inter", sans-serif`,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
        },
        input: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Plus Jakarta Sans", sans-serif`,
        },
      },
    },
  },
});