import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useNbUsers from "../../hooks/useNbUsers";

const NbUsers: React.FC = () => {
  const nbUsers = useNbUsers();

  return (
    <Stack spacing={1} alignItems='center'>
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
