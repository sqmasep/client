import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Box>
      <Stack>
        <Typography>404 Page not found</Typography>
        <Button>Go to homepage</Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
