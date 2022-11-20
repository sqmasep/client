import { useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext } from "react";
import trpc from "../trpc";
import axios from "axios";

interface CountryContext {
  countries: any[];
  countryByCode: (code: string) => unknown;
  countriesByCodes: (codes: string[]) => unknown;
}

const CountryContext = createContext<CountryContext>({
  countries: [],
  countryByCode: () => {},
  countriesByCodes: () => {},
});

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // get restricted countries from server
  const { data: availableCountries } = trpc.country.all.useQuery(undefined, {
    staleTime: Infinity,
  });

  // get corresponding/filtered countries data from an API via code
  const countryByCode = useCallback(
    (code: string) =>
      availableCountries?.find(country => country.cca2 === code),
    [availableCountries]
  );

  const countriesByCodes = useCallback(
    (codes: string[]) =>
      availableCountries?.filter(country => codes.includes(country.cca2)),
    [availableCountries]
  );

  return (
    <CountryContext.Provider
      value={{
        countries: availableCountries,
        countryByCode,
        countriesByCodes,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
