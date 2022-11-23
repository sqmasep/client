import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface MessageInterface {
  message: string;
  user: Record<string, any>;
  date: Date;
}

const Message: React.FC<MessageInterface> = ({ message, user, date }) => {
  return (
    <Box>
      <Avatar />
      <Stack>
        <Link component={RouterLink} to={`/profile/${user.username}`}>
          {user.username}
        </Link>
        <Typography>{format(date, "HH:mm")}</Typography>
        <Typography>{message}</Typography>
      </Stack>
    </Box>
  );
};

export default Message;
