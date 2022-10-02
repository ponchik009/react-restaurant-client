import classNames from "classnames";
import React from "react";

import styles from "./Button.module.css";

export type Width = "max" | "fit-content";

interface IButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  title: string;
  width?: Width;
}

const Button: React.FC<IButtonProps> = ({
  title,
  type = "button",
  onClick,
  width = "inherit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.widthMax]: width === "max",
      })}
    >
      {title}
    </button>
  );
};

export default Button;
