import { Box, Link, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Box>
      <Stack direction='row'>
        {/* <Logo /> */}
        <Stack>
          <Link component={RouterLink} to='/'>
            e!
          </Link>
          <Link component={RouterLink} to='/'></Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
