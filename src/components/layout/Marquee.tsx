import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";

const tips = ["1", "ee", "epic", "wow", "2", "3", "4", "5", "6"];

const Marquee: React.FC = () => {
  const [tip, setTip] = useState(tips[0]);
  useMemo(
    () =>
      setInterval(() => {
        setTip(tips[Math.floor(Math.random() * tips.length - 1)]);
      }, 1000),
    []
  );
  return <Box>{tip}</Box>;
};

export default Marquee;
