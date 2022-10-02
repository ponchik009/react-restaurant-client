import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./PageWrapper.module.css";

interface IPageWrapperProps {
  children?: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>{children ? children : <Outlet />}</div>
  );
};

export default PageWrapper;
