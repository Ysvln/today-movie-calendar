import "./style.scss";

import { ChangeEvent, forwardRef, Ref } from "react";

import ErrorText from "../ErrorText";

interface InputProps {
  type?: string;
  label?: string;
  placeholder?: string;
  name: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef(
  (
    {
      type,
      label,
      placeholder,
      name,
      value,
      error,
      disabled,
      onChange,
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    // useImperativeHandle(ref, () => ({
    //   triggerFocus: () => {
    //     inputRef.current?.focus();
    //   },
    // }));
    return (
      <>
        {label && <label className="label">{label}</label>}
        <div className="input__container">
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`input ${error && "error"}`}
            name={name}
            value={value}
            disabled={disabled}
            onChange={onChange}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </div>
      </>
    );
  }
);

export default Input;
