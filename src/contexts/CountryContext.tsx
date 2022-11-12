import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import trpc from "../trpc";
import axios from "axios";

const CountryContext = createContext<{ countries: any[] }>({ countries: [] });

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // get restricted countries from server
  const { data: availableCountries } = trpc.country.all.useQuery(undefined, {
    staleTime: Infinity,
  });

  // get corresponding/filtered countries data from an API via code
  const { data: countriesData } = useQuery(
    ["countries"],
    () => {
      const url = new URLSearchParams([
        ["codes", availableCountries],
      ] as string[][]);
      return axios.get(`https://restcountries.com/v3.1/alpha?codes=${url}`);
    },
    {
      enabled: !!availableCountries,
      staleTime: Infinity,
    }
  );

  return (
    <CountryContext.Provider value={{ countries: countriesData?.data }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
