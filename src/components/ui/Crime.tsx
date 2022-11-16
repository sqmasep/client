import { Box } from "@mui/material";
import React from "react";

interface CrimeProps {
  children: React.ReactNode;
}

const Crime: React.FC<CrimeProps> = ({ children }) => {
  return <Box>crime</Box>;
};

export default Crime;
