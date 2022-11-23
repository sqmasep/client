import { Box, ButtonBase, styled, Typography } from "@mui/material";
import React from "react";
import { CrimeListInterface } from "../../../../server/dbSchemas/CrimeList";
import { useCountry } from "../../contexts/CountryContext";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
interface CrimeProps {
  crime: CrimeListInterface;
}

const Card = styled(ButtonBase)(({ theme }) => ({
  width: "100% !important",
  border: "2px solid #444",
  position: "relative",
  minHeight: "25ch",
  padding: 2,
  borderRadius: 2,
  overflow: "hidden",
  justifyContent: "start",
  alignItems: "start",
}));
const MotionBox = motion(Card);

const Crime: React.FC<CrimeProps> = ({ crime }) => {
  const { user } = useUser();
  const { countries, getFlag, countryByCode } = useCountry();
  const flagUrl = getFlag(countryByCode(crime.location));

  return (
    <MotionBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 1.01 }}>
      <Box sx={{ p: 2 }}>
        <Typography>{crime.name.fr.toUpperCase()}</Typography>
        {crime.location !== null &&
          crime.location !== user?.currentLocation && <>disabled</>}

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
