import { Box } from "@mui/material";
import React from "react";
import trpc from "../trpc";

const CrimeList: React.FC = () => {
  const { data: crimes } = trpc.crime.getAll.useQuery();
  return (
    <Box>
      crimelist
      {crimes?.map(crime => (
        <div>
          <pre>{JSON.stringify(crime, null, 2)}</pre>
        </div>
      ))}
    </Box>
  );
};

export default CrimeList;
