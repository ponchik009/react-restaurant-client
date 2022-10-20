import React from "react";
import Button from "../../../components/Button/Button";
import { RolesNames } from "../../../const/conts";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { logout } from "../../../store/authSlice/authSlice";

import styles from "./WaiterProfilePage.module.css";

const WaiterProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogoutClick = React.useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <div className={styles.userWrapper}>
      <h2 className={styles.username}>{`${user?.name}`}</h2>
      <Button
        title="Выйти"
        width="fit-content"
        onClick={onLogoutClick}
        color="red"
      />
    </div>
  );
};

export default WaiterProfilePage;
