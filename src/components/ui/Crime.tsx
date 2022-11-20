import { Box } from "@mui/material";
import React from "react";
import { CrimeListInterface } from "../../../../server/dbSchemas/CrimeList";
import { useCountry } from "../../contexts/CountryContext";

interface CrimeProps {
  crime: CrimeListInterface;
}

const Crime: React.FC<CrimeProps> = ({ crime }) => {
  const { countries, countryByCode } = useCountry();
  const fr = countryByCode("FR");
  return (
    <Box>
      {crime.name.fr}
      {crime.location && <img src={countryByCode(crime.location)?.flags.svg} />}

      {/* <img src='https://unsplash.it/500/200' /> */}
    </Box>
  );
};

export default Crime;
