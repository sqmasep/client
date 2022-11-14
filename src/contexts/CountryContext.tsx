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

  return (
    <CountryContext.Provider value={{ countries: availableCountries }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
