import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import trpc from "../lib/trpc";
import { useToken } from "./TokenContext";

interface UserValues {
  isAuth: boolean | undefined;
  user: Record<string, any> | null;
}

const UserContext = createContext<UserValues>({ user: null, isAuth: true });

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useToken();
  const { data } = trpc.user.getInfos.useQuery(token, {
    enabled: !!token,
    staleTime: Infinity,
  });

  return (
    <UserContext.Provider
      value={{
        isAuth: data?.isAuth,
        user: data?.user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
