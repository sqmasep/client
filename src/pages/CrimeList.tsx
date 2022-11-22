import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import trpc from "../trpc";
import Crime from "../components/ui/Crime";

const CrimeList: React.FC = () => {
  const { data: crimes } = trpc.crime.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <Box>
      <Typography variant='title' component='h1'>
        Sors la Thompson, sq
      </Typography>
      <Typography>CRIMES</Typography>
      <Grid container spacing={4}>
        {crimes?.map(crime => (
          <Grid item xs={12} sm={6} xl={4}>
            <Crime crime={crime} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CrimeList;
