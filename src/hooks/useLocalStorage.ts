import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const valueFromStorage = localStorage.getItem(key);
    return valueFromStorage ? JSON.parse(valueFromStorage) : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    localStorage.setItem(key, JSON.stringify(valueToStore));
    setStoredValue(valueToStore);
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
