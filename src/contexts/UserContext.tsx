import React, { createContext, useContext, useState } from "react";
import { token } from "..";
import useLocalStorage from "../hooks/useLocalStorage";
import trpc from "../trpc";

interface UserValues {
  isAuth: boolean | undefined;
  user: unknown;
}

const UserContext = createContext<UserValues>({ user: null, isAuth: true });

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [a, setA] = useLocalStorage("token", token);
  const { data } = trpc.user.getInfos.useQuery(a, {
    enabled: !!a,
    staleTime: Infinity,
  });

  return (
    <UserContext.Provider
      value={{
        // isAuth: data?.isAuth,
        isAuth: true,
        user: data?.user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
