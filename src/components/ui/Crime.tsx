import { Box, Typography } from "@mui/material";
import React from "react";
import { CrimeListInterface } from "../../../../server/dbSchemas/CrimeList";
import { useCountry } from "../../contexts/CountryContext";
import { motion } from "framer-motion";
interface CrimeProps {
  crime: CrimeListInterface;
}

const MotionBox = motion(Box);

const Crime: React.FC<CrimeProps> = ({ crime }) => {
  const { countries, getFlag, countryByCode } = useCountry();
  const flagUrl = getFlag(countryByCode(crime.location));

  return (
    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Box
        sx={{
          position: "relative",
          minHeight: "25ch",
          p: 2,
          border: "2px solid #333",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography>{crime.name.fr.toUpperCase()}</Typography>
        {crime.location && (
          <img
            style={{
              position: "absolute",
              rotate: "20deg",
              width: "5rem",
              top: "-1.25rem",
              right: "-1.25rem",
              borderRadius: 8,
            }}
            src={flagUrl}
          />
        )}
      </Box>
    </MotionBox>
  );
};

export default Crime;
