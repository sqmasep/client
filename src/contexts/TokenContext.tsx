import React, { useContext, createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface TokenValues {
  token: string;
  setToken: (value: string | ((val: string) => string)) => void;
}

const TokenContext = createContext<TokenValues>({
  token: "",
  setToken: () => {},
});

interface TokenProviderInterface {
  children: React.ReactNode;
}

const TokenProvider: React.FC<TokenProviderInterface> = ({ children }) => {
  const [token, setToken] = useLocalStorage("mafia-token", "");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
export default TokenProvider;
