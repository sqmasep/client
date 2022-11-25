import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import trpc from "../lib/trpc";
import Crime from "../components/ui/Crime";
import { useUser } from "../contexts/UserContext";
import { motion, Variants } from "framer-motion";

const MotionGrid = motion(Grid);

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};
const item: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const CrimeList: React.FC = () => {
  const { data: crimes } = trpc.crime.all.useQuery(undefined, {
    staleTime: Infinity,
  });

  const sorted = crimes?.sort(crime => (crime.location === null ? -1 : 1));

  return (
    <Box>
      <Typography variant='title' component='h1'>
        Sors la Thompson, sq
      </Typography>
      <Typography variant='category'>CRIMES</Typography>

      <Container>
        {crimes && (
          <MotionGrid
            variants={container}
            animate='show'
            initial='hidden'
            container
            spacing={4}
          >
            {crimes?.map(crime => (
              <MotionGrid
                key={crime._id}
                variants={item}
                item
                xs={12}
                sm={6}
                xl={4}
              >
                <Crime crime={crime} />
              </MotionGrid>
            ))}
          </MotionGrid>
        )}
      </Container>
    </Box>
  );
};

export default CrimeList;
