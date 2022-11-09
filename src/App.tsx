import React from "react";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#f00",
    },
  },
  typography: {
    fontFamily: "Readex Pro",
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
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
