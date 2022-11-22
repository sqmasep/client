import { createTheme } from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariant {
    title: React.CSSProperties;
  }

  interface TypographyVariantOptions {
    title?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FE3D3D",
    },
  },
  typography: {
    fontFamily: "Readex Pro",
    title: {
      color: "#fff",
      fontFamily: "IM FELL French Canon",
      fontSize: "2rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      defaultProps: {
        fixed: true,
        maxWidth: "xl",
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
      },
    },
  },
});

export default theme;
