import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Settings {
  animations: boolean;
  language: string;
}

interface SettingsContext extends Settings {
  setAnimations: (value: boolean) => void;
  setLanguage: (language: string) => void;
}

interface SettingsProviderInterface {
  children: React.ReactNode;
}

const SettingsContext = createContext<SettingsContext>({
  animations: true,
  language: "FR",
  setAnimations: () => {},
  setLanguage: () => {},
});

const SettingsProvider: React.FC<SettingsProviderInterface> = ({
  children,
}) => {
  const [{ animations, language }, setSettings] = useLocalStorage<Settings>(
    "mafia-rp-settings",
    { animations: true, language: "FR" }
  );

  const setAnimations = (value: boolean) => {
    setSettings(prev => ({ ...prev, animations: value }));
  };

  const setLanguage = (language: string) => {
    setSettings(prev => ({ ...prev, language }));
  };

  return (
    <SettingsContext.Provider
      value={{ animations, language, setAnimations, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
export const useSettings = () => useContext(SettingsContext);
