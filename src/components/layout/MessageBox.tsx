import React, { useState } from "react";
import { Box, Fab, IconButton, TextField } from "@mui/material";
import { PeopleAlt, Send } from "@mui/icons-material";
import useToggle from "../../hooks/useToggle";
import socket from "../../lib/socket";
import Message from "../ui/Message";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Formik, Form, Field } from "formik";
import { format } from "date-fns";
import { useUser } from "../../contexts/UserContext";
import { MessageInterface } from "../ui/Message";

const MessageBox: React.FC = () => {
  const { user } = useUser();
  const [isOpen, toggle] = useToggle();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  socket.on("newMessage", data => setMessages(prev => [...prev, data]));

  const sendNewMessage = ({ message }, { resetForm }) => {
    resetForm();
    setMessages(prev => [
      ...prev,
      { user, date: new Date(Date.now()), message },
    ]);
    socket.emit("newMessage", message);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 4 }}>
      {isOpen && messages.length
        ? messages.map(message => (
            <Message
              message={message.message}
              date={message.date}
              user={message.user}
            />
          ))
        : "no messages"}

      <Formik
        initialValues={{ message: "" }}
        validationSchema={toFormikValidationSchema(
          z.object({
            message: z.string(),
          })
        )}
        onSubmit={sendNewMessage}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <Field name='message' as={TextField} size='small' />
              <IconButton type='submit'>
                <Send />
              </IconButton>
            </Form>
          );
        }}
      </Formik>

      <Fab color='primary' onClick={toggle}>
        <PeopleAlt />
      </Fab>
    </Box>
  );
};

export default MessageBox;
