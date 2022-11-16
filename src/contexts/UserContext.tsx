import React, { createContext, useContext } from "react";
import trpc from "../trpc";

const UserContext = createContext({});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserContext.Provider value={{ e: "" }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
