import { useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    document.body.style.overflowY = "hidden";
    setIsOpen(true);
  };

  const close = () => {
    document.body.style.overflowY = "auto";
    setIsOpen(false);
  };

  return { isOpen, open, close, toggle };
};
