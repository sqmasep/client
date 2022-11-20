import { Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <Stack direction='column'>
      <NavLink to='/profile'>PROFIL</NavLink>
      <NavLink to='/crimes'>CRIMES</NavLink>
      <NavLink to='/travel'>VOYAGER</NavLink>
      <NavLink to='/casino'>CASINO</NavLink>
    </Stack>
  );
};

export default Sidebar;
