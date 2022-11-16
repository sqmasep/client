import { Button } from "@mui/material";
import React from "react";
import trpc from "../trpc";

const Home: React.FC = () => {
  trpc.user.test.useQuery();
  return (
    <>
      <Button>epic</Button>
    </>
  );
};

export default Home;
