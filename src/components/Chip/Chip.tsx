import classNames from "classnames";
import React from "react";

import styles from "./Chip.module.css";

export type ChipColors = "red" | "green" | "yellow";
type ChipSizes = "xs" | "md" | "xl";

interface IChipProps {
  title: string;
  color?: ChipColors;
  size?: ChipSizes;
  icon?: React.ReactNode;
}

const Chip: React.FC<IChipProps> = ({
  title,
  color = "green",
  size = "md",
  icon,
}) => {
  return (
    <div className={classNames(styles.chip, styles[color], styles[size])}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default Chip;
