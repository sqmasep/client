import { Container, TextField } from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import trpc from "../../trpc";
import { createUser } from "../../../../server/data/formSchemas";
import { useCountry } from "../../contexts/CountryContext";

const Signup: React.FC = () => {
  const { countries } = useCountry();
  const mutation = trpc.user.create.useMutation({});

  return (
    <Container>
      <Formik
        initialValues={createUser.initialValues}
        validationSchema={toFormikValidationSchema(createUser.schema)}
        onSubmit={() => {
          console.log();
        }}
      >
        {({ values, errors, isSubmitting, touched }) => {
          return (
            <Form>
              <Field as={TextField} label='Email' name='email' />
              {touched.email && <ErrorMessage name='email' />}
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          );
        }}
      </Formik>
      countries:{" "}
      <pre>{JSON.stringify(countries?.map(e => e.name).length, null, 2)}</pre>
    </Container>
  );
};

export default Signup;
