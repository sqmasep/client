import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { socket } from "../../App";

const Navbar: React.FC = () => {
  const [nbUsers, setNbUsers] = useState(0);
  socket.on("nbUsers", nbUsers => setNbUsers(nbUsers));
  return (
    <Container>
      {/* <Logo /> */}
      <Stack justifyContent='space-between' my={2}>
        <Link component={RouterLink} to='/'>
          <Typography>Mafia RP</Typography>
        </Link>
        <Stack spacing={8}>
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
          <Stack spacing={2}>
            <Button
              variant='outlined'
              LinkComponent={RouterLink}
              to='/put-on-your-red-blazer'
            >
              Login
            </Button>
            <Button LinkComponent={RouterLink} to='/become-a-bad-guy'>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
