import React from "react";
import { Box, Fab } from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";
import useToggle from "../../hooks/useToggle";
import { socket } from "../..";

const MessageBox: React.FC = () => {
  const [isOpen, toggle] = useToggle();

  socket.on("", () => {});

  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 4 }}>
      {isOpen && <Box>epic</Box>}
      <Fab color='primary' onClick={toggle}>
        <PeopleAlt />
      </Fab>
    </Box>
  );
};

export default MessageBox;
