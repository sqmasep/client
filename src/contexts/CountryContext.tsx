import { useQuery } from "@tanstack/react-query";
import React, { createContext, useCallback, useContext } from "react";
import trpc from "../trpc";

interface CountryContext {
  countries: any[];
  countryByCode: (code: string) => unknown;
  countriesByCodes: (codes: string[]) => unknown;
  getFlag: (country: unknown) => string | undefined;
}

const CountryContext = createContext<CountryContext>({
  countries: [],
  countryByCode: () => {},
  countriesByCodes: () => {},
  getFlag: () => "",
});

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // get restricted countries from server
  const { data: availableCountries } = trpc.country.all.useQuery(undefined, {
    staleTime: Infinity,
  });

  // get corresponding/found country data from an API via code
  const countryByCode = (code: string) =>
    availableCountries?.find(country => country.cca2 === code);

  // get corresponding/filtered countries data from an API via code
  const countriesByCodes = (codes: string[]) =>
    availableCountries?.filter(country => codes.includes(country.cca2));

  // get svg flag from country
  const getFlag = country => country?.flags?.svg;

  return (
    <CountryContext.Provider
      value={{
        countries: availableCountries,
        countryByCode,
        countriesByCodes,
        getFlag,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
