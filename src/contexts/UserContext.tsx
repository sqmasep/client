import React, { createContext, useContext } from "react";
import trpc from "../trpc";

const UserContext = createContext({});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  trpc.user.

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
