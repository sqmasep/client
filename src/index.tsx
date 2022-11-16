import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { io } from "socket.io-client";
import App from "./App";
import { CountryProvider } from "./contexts/CountryContext";
import UserProvider from "./contexts/UserContext";
import trpc from "./trpc";

export let token: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjYzNzM5NTdiMjZiZjkyYjFiYmJhOTQ1MSJ9.XcYgOFwI68LkLKxR3PKMOe8Zy0y3oWDwLuLb_3PX47E";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4321/trpc/",
      headers: () => ({
        Authorization: token,
      }),
    }),
  ],
});

export const socket = io("http://localhost:4321");

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FE3D3D",
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
    MuiStack: {
      defaultProps: {
        direction: "row",
        alignItems: "center",
      },
    },
  },
});

root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <CountryProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </CountryProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  </Router>
);
