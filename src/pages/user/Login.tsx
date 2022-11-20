import { Container, TextField } from "@mui/material";
import React from "react";
import trpc from "../../trpc";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { login } from "../../../../server/data/formSchemas";

const Login: React.FC = () => {
  const mutation = trpc.user.login.useMutation();

  const logIn = ({ password, username }) => {
    mutation.mutate({ password, username });
  };

  return (
    <Container>
      <Formik
        initialValues={login.initialValues}
        validationSchema={toFormikValidationSchema(login.schema)}
        onSubmit={() => {
          console.log();
        }}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <Field name='username' />
              {touched.email && <ErrorMessage name='email' />}
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Login;
