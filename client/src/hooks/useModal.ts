import { useState } from "react";

const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (name: string) => {
    document.body.style.overflowY = "hidden";
    setActiveModal(name);
  };

  const closeModal = () => {
    document.body.style.overflowY = "auto";
    setActiveModal(null);
  };

  return {
    activeModal,
    openModal,
    closeModal,
  };
};

export default useModal;
