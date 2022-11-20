import { Box } from "@mui/material";
import React from "react";

interface CrimeProps {
  children: React.ReactNode;
}

const Crime: React.FC<CrimeProps> = ({ children }) => {
  return (
    <Box>
      <img src='https://unsplash.it/500/200' />
    </Box>
  );
};

export default Crime;
