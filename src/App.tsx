import React from "react";
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
import { useUser } from "./contexts/UserContext";
import CrimeList from "./pages/CrimeList";
import MessageBox from "./components/layout/MessageBox";
import { Stack } from "@mui/material";
import UserProfile from "./pages/profile/UserProfile";
import OwnProfile from "./pages/profile/OwnProfile";

const App: React.FC = () => {
  const { isAuth } = useUser();

  return (
    <>
      <ReactQueryDevtools />
      <MessageBox />
      {/* <Marquee /> */}
      <Navbar />
      {/* <Sidebar /> */}
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

export default App;
