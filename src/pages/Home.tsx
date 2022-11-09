import { Button } from "@mui/material";
import React from "react";
import trpc from "../trpc";

const Home: React.FC = () => {
  const res = trpc.user.test.useQuery();
  return (
    <>
      <pre>{JSON.stringify(res, null, 2)}</pre>

      <Button>epic</Button>
    </>
  );
};

export default Home;
