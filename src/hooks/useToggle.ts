import React, { useCallback, useState } from "react";

const useToggle = (initial: boolean = false): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(initial);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return [isOpen, toggle];
};

export default useToggle;
