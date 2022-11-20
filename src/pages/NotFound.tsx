import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Box height='100vh'>
      <Stack>
        <Typography variant='h1'>404 Page not found</Typography>
        <Button>Go to homepage</Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
