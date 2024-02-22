import { useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close, toggle };
};
