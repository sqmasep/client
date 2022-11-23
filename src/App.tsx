import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/user/Signup";
import Login from "./pages/user/Login";
import "./globals.css";

import Sidebar from "./components/layout/Sidebar";
import Marquee from "./components/layout/Marquee";
import NotFound from "./pages/NotFound";
import UserProvider, { useUser } from "./contexts/UserContext";
import CrimeList from "./pages/CrimeList";
import MessageBox from "./components/layout/MessageBox";
import { Stack, ThemeProvider } from "@mui/material";
import UserProfile from "./pages/profile/UserProfile";
import OwnProfile from "./pages/profile/OwnProfile";
import trpc from "./lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CountryProvider } from "./contexts/CountryContext";
import theme from "./theme";
import { httpBatchLink } from "@trpc/react-query";
import { useToken } from "./contexts/TokenContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { token } = useToken();

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4321/trpc/",
          headers: () => ({
            Authorization: token,
          }),
        }),
      ],
    });
  });

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <CountryProvider>
            <UserProvider>
              <ThemeProvider theme={theme}>
                <AppContent />
              </ThemeProvider>
            </UserProvider>
          </CountryProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
};

export default App;

const AppContent: React.FC = () => {
  const { isAuth } = useUser();

  return (
    <>
      <ReactQueryDevtools />
      <MessageBox />
      {/* <Marquee /> */}
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/become-a-bad-guy' element={<SignIn />} />
        <Route
          path='/put-on-your-red-blazer'
          element={isAuth ? <Navigate to='/profile' /> : <Login />}
        />
        <Route path='/crimes' element={<CrimeList />} />
        <Route path='/profile' element={<OwnProfile />} />
        <Route path='/profile/:username' element={<UserProfile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
