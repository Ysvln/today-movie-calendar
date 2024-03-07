import "./style.scss";

import { ButtonHTMLAttributes, ReactNode } from "react";
import ArrowIcon from "@/assets/icons/arrow_forward.svg";

type Type = "primary" | "secondary" | "kakao" | "white" | "gray" | "sub";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  btnType?: Type;
  icon?: boolean;
}

const Button = ({
  children,
  btnType = "primary",
  icon,
  ...props
}: ButtonProps) => {
  const className = `button button__${btnType} ${icon && "icon"}`;
  return (
    <button className={className} {...props}>
      {children}
      {icon && <img src={ArrowIcon} alt="검색" className="icon" />}
    </button>
  );
};

export default Button;
