import "./style.scss";

import { ReactNode, useEffect, useRef } from "react";

import close from "@assets/icons/close.svg";

interface ModalProps {
  title: string;
  children: ReactNode;
  handleModalClose: () => void;
}

const Modal = ({ children, title, handleModalClose }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target == ref.current) {
        handleModalClose();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [ref, handleModalClose]);
  return (
    <>
      <div className="modal">
        <div className="modal__container">
          {/* 상단 모달 타이틀 및 닫기 버튼 */}
          <div className="modal__header">
            <p className="modal__title">{title}</p>
            <div className="modal__close-button" onClick={handleModalClose}>
              <img src={close} alt="닫기 아이콘" />
            </div>
          </div>

          <div className="modal__content">
            {/* 하단 컨텐츠 */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
