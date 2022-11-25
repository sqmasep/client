import { createTheme } from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
  interface TypographyVariant {
    title: React.CSSProperties;
    category: React.CSSProperties;
  }

  interface TypographyVariantOptions {
    title?: React.CSSProperties;
    category?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    category: true;
  }
}

const defaultUI = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fe3d3d",
    },
  },
});

const componentTheme = createTheme({
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
    category: {
      color: "#fff",
      fontFamily: "Impact",
      fontSize: "1.25rem",
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

export default { ...defaultUI, ...componentTheme };
