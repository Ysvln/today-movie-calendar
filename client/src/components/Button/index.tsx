/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";

import { ReactNode } from "react";
import ArrowIcon from "@/assets/icons/arrow_forward.svg";

type Type = "primary" | "secondary" | "kakao" | "white" | "gray" | "sub";

interface ButtonProps {
  type?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  btnType?: Type;
  icon?: boolean;
}

const Button = ({
  type,
  children,
  btnType = "primary",
  onClick,
  disabled,
  icon,
  ...props
}: ButtonProps) => {
  const className = `button button__${btnType} ${icon && "icon"} ${
    disabled && "disabled"
  }`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}

      {icon && <img src={ArrowIcon} alt="검색" className="icon" />}
    </button>
  );
};

export default Button;
