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
  disabled: boolean;
  type?: React.HTMLInputTypeAttribute;
}

const Input: React.FC<IInputProps> = React.memo(
  ({
    rows = 1,
    value,
    onChange,
    placeholder,
    disabled = false,
    type = "text",
  }) => {
    return (
      <>
        {rows === 1 ? (
          <input
            type={type}
            className={classNames(styles.input)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <textarea
            rows={rows}
            className={classNames(styles.input)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </>
    );
  }
);

export default Input;
