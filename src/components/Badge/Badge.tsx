import classNames from "classnames";
import React from "react";
import ReactDOM from "react-dom";

import { ReactComponent as IconClose } from "../../assets/icons/IconClose.svg";

import styles from "./Badge.module.css";

export type BadgeColor = "red" | "green";

interface IBadgeProps {
  open: boolean;
  onClose: () => void;
  title: string;
  color?: BadgeColor;
}

const Badge: React.FC<IBadgeProps> = ({ open, onClose, title, color }) => {
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const [shows, setShows] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setShows(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setShows(false);
      }, 4000);
    }
  }, [open]);

  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={classNames(styles.badge, {
            [styles.red]: color === "red",
            [styles.green]: color === "green",
            [styles.badgeDelete]: !shows,
          })}
          onClick={onClose}
        >
          {title}
        </div>
      )}
    </>,
    document.body
  );
};

export default Badge;
