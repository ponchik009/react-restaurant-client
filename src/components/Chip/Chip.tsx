import classNames from "classnames";
import React from "react";

import styles from "./Chip.module.css";

export type ChipColors = "red" | "green" | "yellow";
type ChipSizes = "xs" | "md" | "xl";

interface IChipProps {
  title: string;
  color?: ChipColors;
  size?: ChipSizes;
}

const Chip: React.FC<IChipProps> = ({
  title,
  color = "green",
  size = "md",
}) => {
  return (
    <div className={classNames(styles.chip, styles[color], styles[size])}>
      {title}
    </div>
  );
};

export default Chip;
