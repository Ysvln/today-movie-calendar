import "./style.scss";

import { InputHTMLAttributes, forwardRef, Ref } from "react";

import ErrorText from "../ErrorText";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef(
  ({ label, error, ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <>
        {label && <label className="label">{label}</label>}
        <div className="input__container">
          <input ref={ref} className={`input ${error && "error"}`} {...props} />
          {error && <ErrorText>{error}</ErrorText>}
        </div>
      </>
    );
  }
);

export default Input;
