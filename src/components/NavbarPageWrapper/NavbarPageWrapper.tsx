import classNames from "classnames";
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as IconDogGreen } from "../../assets/icons/IconDogGreen.svg";
import { AppRoutes, RolesMenu, RolesNames } from "../../const/conts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../store/authSlice/authSlice";
import Button from "../Button/Button";

import { ReactComponent as IconBack } from "../../assets/icons/IconBack.svg";

import styles from "./NavbarPageWrapper.module.css";
import { Roles } from "../../types/enums";
import { socket } from "../../api/api";
import { addOrder, updateStatus } from "../../store/orderSlice/ordersSlice";
import { IOrder, IOrderDish } from "../../types/apiTypes";

const NavbarPageWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogoutClick = React.useCallback(() => {
    dispatch(logout());
  }, []);

  React.useEffect(() => {
    if (user!.role.name !== Roles.MANAGER) {
      socket.emit("joinKitchen", user!.name);
      socket.on("joinedKitchen", (data: any) => console.log(data));
    }

    if (user!.role.name === Roles.KITCHEN) {
      socket.on("orderCreated", (order: IOrder) => dispatch(addOrder(order)));
      socket.on("startedCooking", (dishOrder: IOrderDish) =>
        dispatch(updateStatus(dishOrder))
      );
      socket.on("endedCooking", (dishOrder: IOrderDish) =>
        dispatch(updateStatus(dishOrder))
      );
      socket.on("deliveredDish", (dishOrder: IOrderDish) =>
        dispatch(updateStatus(dishOrder))
      );
    }

    if (user!.role.name === Roles.WAITER) {
      socket.on(
        "orderCreated",
        (order: IOrder) =>
          order.waiter.id === user!.id && dispatch(addOrder(order))
      );
      socket.on(
        "startedCooking",
        (dishOrder: IOrderDish) =>
          dishOrder.order.waiter.id === user!.id &&
          dispatch(updateStatus(dishOrder))
      );
      socket.on(
        "endedCooking",
        (dishOrder: IOrderDish) =>
          dishOrder.order.waiter.id === user!.id &&
          dispatch(updateStatus(dishOrder))
      );
      socket.on(
        "deliveredDish",
        (dishOrder: IOrderDish) =>
          dishOrder.order.waiter.id === user!.id &&
          dispatch(updateStatus(dishOrder))
      );
    }
  }, []);

  const currentRoute = React.useMemo(
    () =>
      Object.values(RolesMenu[user!.role.name]).find(
        (menuItem) =>
          // костыль (пока не знаю как решить)
          menuItem.url === location.pathname || menuItem.url === "/dish/:id"
      ),
    [location.pathname]
  );

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={styles.aboveNavbar}>
          <div className={styles.titleWrapper}>
            <IconDogGreen className={styles.icon} />
            <h2 className={styles.title}>Лучший корейский ресторан</h2>
          </div>
          <div className={styles.userWrapper}>
            <h2 className={styles.username}>{`${user?.name}`}</h2>
            <Button
              title="Выйти"
              width="fit-content"
              onClick={onLogoutClick}
              color="red"
            />
          </div>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles.navlist}>
            {Object.values(RolesMenu[user!.role.name]).map(
              (menuItem, index, arr) =>
                !menuItem.hide &&
                arr.filter((i) => !i.hide).length > 1 && (
                  <li
                    className={classNames(styles.navitem, {
                      [styles.active]: menuItem.url === location.pathname,
                    })}
                    onClick={() => navigate(menuItem.url)}
                    key={menuItem.url}
                  >
                    <span className={styles.menuItemText}>{menuItem.name}</span>
                    {menuItem.icon && (
                      <span className={styles.menuItemIcon}>
                        {menuItem.icon}
                      </span>
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <div className={styles.mobileAppbar}>
        {currentRoute?.withBack && <IconBack onClick={() => navigate(-1)} />}
        <span>{currentRoute?.name}</span>
      </div>
    </div>
  );
};

export default NavbarPageWrapper;
