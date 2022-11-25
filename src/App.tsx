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
import CountryProvider from "./contexts/CountryContext";
import theme from "./theme";
import { httpBatchLink } from "@trpc/react-query";
import { useToken } from "./contexts/TokenContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useSettings } from "./contexts/SettingsContext";

const queryClient = new QueryClient();

const page: Variants = {
  hidden: { y: "10vh", opacity: 0 },
  show: { y: 0, opacity: 1 },
  exit: { y: "-20vh", opacity: 0, scale: 0.7, transition: { duration: 0.25 } },
};

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { animations } = useSettings();

  return (
    <AnimatePresence mode={animations ? "wait" : "popLayout"}>
      <motion.div
        variants={animations ? page : undefined}
        initial={animations ? "hidden" : undefined}
        animate={animations ? "show" : undefined}
        exit={animations ? "exit" : undefined}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

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

        <Route
          path='/become-a-bad-guy'
          element={
            <AnimatedPage>
              <SignIn />
            </AnimatedPage>
          }
        />
        <Route
          path='/put-on-your-red-blazer'
          element={
            isAuth ? (
              <Navigate to='/profile' />
            ) : (
              <AnimatedPage>
                <Login />
              </AnimatedPage>
            )
          }
        />
        <Route
          path='/crimes'
          element={
            <AnimatedPage>
              <CrimeList />
            </AnimatedPage>
          }
        />
        <Route
          path='/profile'
          element={
            <AnimatedPage>
              <OwnProfile />
            </AnimatedPage>
          }
        />
        <Route path='/profile/:username' element={<UserProfile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
