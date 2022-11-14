import { Box, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tips = ["1", "ee", "epic", "wow", "2", "3", "4", "5", "6"];

const Marquee: React.FC = () => {
  const [tipIndex, setTipIndex] = useState(0);
  useMemo(
    () =>
      setInterval(() => {
        setTipIndex(Math.floor(Math.random() * tips.length));
      }, 2000),
    []
  );
  return (
    <div style={{ position: "relative", height: "1em", overflow: "hidden" }}>
      <AnimatePresence>
        {tips.map(
          e =>
            tipIndex === tips.indexOf(e) && (
              <motion.div
                key={e}
                style={{ position: "absolute", width: "100%", top: 0 }}
                animate={{ x: "50%" }}
                initial={{ x: "100%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1, ease: "anticipate" }}
              >
                {e}
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marquee;
