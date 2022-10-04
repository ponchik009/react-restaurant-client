import classNames from "classnames";
import React from "react";

import styles from "./Input.module.css";

interface IInputProps {
  rows?: number;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isError?: boolean;
}

const Input: React.FC<IInputProps> = React.memo(
  ({
    rows = 1,
    value,
    onChange,
    placeholder,
    disabled = false,
    type = "text",
    isError = false,
  }) => {
    return (
      <>
        {rows === 1 ? (
          <input
            type={type}
            className={classNames(styles.input, {
              [styles.error]: isError,
            })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="new-password"
          />
        ) : (
          <textarea
            rows={rows}
            className={classNames(styles.input, {
              [styles.error]: isError,
            })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="new-password"
          />
        )}
      </>
    );
  }
);

export default Input;
