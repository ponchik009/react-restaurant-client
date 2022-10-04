import classNames from "classnames";
import React from "react";

import styles from "./Button.module.css";

export type ButtonWidth = "max" | "fit-content";
export type ButtonColor = "red" | "green";

interface IButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  title: string;
  width?: ButtonWidth;
  color?: ButtonColor;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  title,
  type = "button",
  onClick,
  width = "inherit",
  color = "green",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.widthMax]: width === "max",
        [styles.red]: color === "red",
        [styles.green]: color === "green",
      })}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
