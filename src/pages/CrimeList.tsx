import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import trpc from "../lib/trpc";
import Crime from "../components/ui/Crime";
import { useUser } from "../contexts/UserContext";

const CrimeList: React.FC = () => {
  const { data: crimes } = trpc.crime.all.useQuery(undefined, {
    staleTime: Infinity,
  });

  const sorted = crimes?.sort(crime => (crime.location == null ? -1 : 1));

  const { user } = useUser();

  return (
    <Box>
      <Typography variant='title' component='h1'>
        Sors la Thompson, sq
      </Typography>
      <Typography variant='category'>CRIMES</Typography>

      <Container>
        <Grid container spacing={4}>
          {crimes?.map(crime => (
            <Grid key={crime._id} item xs={12} sm={6} xl={4}>
              <Crime crime={crime} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CrimeList;
