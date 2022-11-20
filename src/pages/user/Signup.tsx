import {
  Avatar,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import trpc from "../../trpc";
import { createUser } from "../../../../server/data/formSchemas";
import { useCountry } from "../../contexts/CountryContext";

const form: {
  name: keyof typeof createUser.initialValues;
  label: string;
}[] = [
  { name: "email", label: "Email" },
  { name: "username", label: "Username" },
  { name: "password", label: "Password" },
  { name: "confirmPassword", label: "Confirm password" },
];

const Signup: React.FC = () => {
  const { countries } = useCountry();
  const selectCountriesOptions = countries?.map(country => ({
    name: country.name.common,
    flag: country.flags.svg,
    code: country.cca2,
  }));
  const mutation = trpc.user.create.useMutation({});

  return (
    <Container>
      <Formik
        initialValues={createUser.initialValues}
        validationSchema={toFormikValidationSchema(createUser.schema)}
        onSubmit={val => {
          mutation.mutate(val);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Paper sx={{ p: 4, width: "50%", mx: "auto" }}>
                <Stack direction='column' spacing={2}>
                  <Typography variant='h2' component='h1' mb={4}>
                    Sign up
                  </Typography>
                  {form.map(el => (
                    <Field
                      key={el.name}
                      as={TextField}
                      error={touched[el.name] && !!errors[el.name]}
                      helperText={touched[el.name] && errors[el.name]}
                      label={el.label}
                      name={el.name}
                      fullWidth
                    />
                  ))}
                  <FormControl fullWidth>
                    <InputLabel id='select-country-label'>
                      Country of start
                    </InputLabel>
                    <Select
                      labelId='select-country-label'
                      id='select-country'
                      label='Country of start'
                      value={values.originLocation}
                      onBlur={handleBlur}
                      name='originLocation'
                      onChange={handleChange}
                      error={touched.originLocation && !!errors.originLocation}
                      fullWidth
                    >
                      {selectCountriesOptions?.map(country => (
                        <MenuItem value={country.code} key={country.name}>
                          <Chip
                            avatar={<Avatar src={country.flag} />}
                            label={country.name}
                            variant='outlined'
                          />
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.originLocation && errors.originLocation}
                  </FormControl>
                  <Button type='submit' fullWidth>
                    Sign up
                  </Button>
                </Stack>
              </Paper>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default Signup;
