import classNames from "classnames";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as IconDogGreen } from "../../assets/icons/IconDogGreen.svg";
import { AppRoutes, RolesMenu, RolesNames } from "../../const/conts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../store/authSlice/authSlice";
import Button from "../Button/Button";

import styles from "./NavbarPageWrapper.module.css";

const NavbarPageWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogoutClick = React.useCallback(() => {
    dispatch(logout());
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.aboveNavbar}>
          <div className={styles.titleWrapper}>
            <IconDogGreen className={styles.icon} />
            <h2 className={styles.title}>Лучший корейский ресторан</h2>
          </div>
          <div className={styles.userWrapper}>
            <h2 className={styles.username}>{`${RolesNames[user!.role.name]} ${
              user?.name
            }`}</h2>
            <Button title="Выйти" width="fit-content" onClick={onLogoutClick} />
          </div>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles.navlist}>
            {Object.values(RolesMenu[user!.role.name]).map(
              (menuItem) =>
                !menuItem.hide && (
                  <li
                    className={classNames(styles.navitem, {
                      [styles.active]: menuItem.url === location.pathname,
                    })}
                    onClick={() => navigate(menuItem.url)}
                  >
                    {menuItem.name}
                  </li>
                )
            )}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarPageWrapper;
