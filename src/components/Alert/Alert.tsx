import classNames from "classnames";
import React from "react";
import ReactDOM from "react-dom";

import { ReactComponent as IconClose } from "../../assets/icons/IconClose.svg";

import styles from "./Alert.module.css";

export type AlertColor = "red" | "green";

interface IAlertProps {
  open: boolean;
  onClose: () => void;
  title: string;
  color?: AlertColor;
}

const Alert: React.FC<IAlertProps> = ({ open, onClose, title, color }) => {
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
        setTimeout(onClose, 2000);
      }, 4000);
    }
  }, [open]);

  return ReactDOM.createPortal(
    <>
      {open && (
        <div
          className={classNames(styles.alert, {
            [styles.red]: color === "red",
            [styles.green]: color === "green",
            [styles.alertDelete]: !shows,
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

export default Alert;
