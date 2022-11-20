import { Box } from "@mui/material";
import React from "react";
import trpc from "../trpc";
import Crime from "../components/ui/Crime";

const CrimeList: React.FC = () => {
  const { data: crimes } = trpc.crime.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <Box>
      crimelist
      {crimes?.map(crime => (
        <Crime crime={crime} />
      ))}
    </Box>
  );
};

export default CrimeList;
