import React from "react";
import { Route, Routes } from "react-router-dom";
import trpc from "./trpc";
import { httpBatchLink } from "@trpc/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/user/Signup";
import Login from "./pages/user/Login";
import "./globals.css";
import io from "socket.io-client";
import { CountryProvider } from "./contexts/CountryContext";
import Sidebar from "./components/layout/Sidebar";
import Marquee from "./components/layout/Marquee";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4321/trpc/",
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <CountryProvider>
            <ReactQueryDevtools />
            {/* <Marquee /> */}
            <Navbar />
            {/* <Sidebar /> */}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/become-a-bad-guy' element={<SignIn />} />
              <Route path='/put-on-your-red-blazer' element={<Login />} />
              <Route path='/profile' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </CountryProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
};

export default App;
