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
import theme from "./theme";
import trpc from "./trpc";

export let token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3YTJhZmFhZDJiYjE2OWM2ZWQyYTdmIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2ODk4MzQ2Nn0.CSXYhXZZrWl8JR6Z-wn6iiyd14FklErmZ7Sy_JS5HkE";

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
