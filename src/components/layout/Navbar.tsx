import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { socket } from "../..";
import { useUser } from "../../contexts/UserContext";
import NbUsers from "../ui/NbUsers";
import { Notifications } from "@mui/icons-material";

const Navbar: React.FC = () => {
  const { user, isAuth } = useUser();
  return (
    <Container>
      {/* <Logo /> */}
      <Stack justifyContent='space-between' my={2}>
        <Link component={RouterLink} to='/'>
          <Typography>Mafia RP</Typography>
        </Link>
        <Stack spacing={8}>
          <NbUsers />
          {isAuth ? (
            <RouterLink to='/profile'>
              <Avatar />
            </RouterLink>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
