import { useState } from "react";

const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (name: string) => {
    setActiveModal(name);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return {
    activeModal,
    openModal,
    closeModal,
  };
};

export default useModal;
