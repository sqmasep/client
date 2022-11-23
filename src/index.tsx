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
import trpc from "./lib/trpc";

export let token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3Y2UzNzY4NGFhMGRiNjhjNDljYmZlIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY2OTE5MTI5M30.Ccp1JzTAMhkx-IYO9zJMQEnvFumX1jQZ-nHllrdrDCM";
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
