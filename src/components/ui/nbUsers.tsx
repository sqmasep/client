import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { socket } from "../../App";
import useNbUsers from "../../hooks/nbUsers";

const NbUsers: React.FC = () => {
  const nbUsers = useNbUsers();

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          borderRadius: "50%",
          width: "1em",
          height: "1em",
          backgroundColor: "red",
        }}
      />
      <Typography>{nbUsers}</Typography>
    </Stack>
  );
};

export default NbUsers;
