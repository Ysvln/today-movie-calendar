import "./style.scss";
import { ReactNode } from "react";

type Type = "primary" | "secondary";

interface ErrorTextProps {
  children: ReactNode;
  type?: Type;
}

const ErrorText = (props: ErrorTextProps) => {
  const { children, type = "primary" } = props;
  const className = `error error__${type}`;

  return <span className={className}>{children}</span>;
};

export default ErrorText;
