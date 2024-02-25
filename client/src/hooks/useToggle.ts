import { useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const open = () => {
    document.body.style.overflowY = "hidden";
    document.body.style.touchAction = "none";
    setIsOpen(true);
  };

  const close = () => {
    document.body.style.overflowY = "auto";
    document.body.style.touchAction = "auto";
    setIsOpen(false);
  };

  return { isOpen, open, close, toggle };
};
