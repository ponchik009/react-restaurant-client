import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppRoutes, RolesMenu } from "../../const/conts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import DishPage from "../../pages/WaiterPages/DishPage/DishPage";
import ForbiddenPage from "../../pages/ErrorPages/ForbiddenPage/ForbiddenPage";
import NotFoundPage from "../../pages/ErrorPages/NotFoundPage/NotFoundPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MenuPage from "../../pages/ManagerPages/MenuPage/MenuPage";
import ReportsPage from "../../pages/ManagerPages/ReportsPage/ReportsPage";
import UsersPage from "../../pages/ManagerPages/UsersPage/UsersPage";
import AddOrderPage from "../../pages/WaiterPages/AddOrderPage/AddOrderPage";
import OrdersHistoryPage from "../../pages/WaiterPages/OrdersHistoryPage/OrdersHistoryPage";
import OrdersPage from "../../pages/WaiterPages/OrdersPage/OrdersPage";
import WaiterMenuPage from "../../pages/WaiterPages/WaiterMenuPage/WaiterMenuPage";
import WaiterProfilePage from "../../pages/WaiterPages/WaiterProfilePage/WaiterProfilePage";
import { fetchUser } from "../../store/authSlice/authSlice";
import { LoadingStatuses, Roles } from "../../types/enums";
import NavbarPageWrapper from "../NavbarPageWrapper/NavbarPageWrapper";
import PageWrapper from "../PageWrapper/PageWrapper";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import KitchenOrdersPage from "../../pages/KitchenPages/KitchenOrdersPage/KitchenOrdersPage";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { user, status, authError } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Routes>
      <Route element={<PageWrapper />}>
        <Route
          element={
            <ProtectedRoute
              isLoading={status === LoadingStatuses.PENDING}
              isSuccess={user !== null}
              onSuccessRedirectPath="/"
            />
          }
        >
          <Route path={AppRoutes.login.url} element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              isLoading={status === LoadingStatuses.PENDING}
              isSuccess={user !== null}
              onFailRedirectPath={AppRoutes.login.url}
            />
          }
        >
          <Route element={<NavbarPageWrapper />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={RolesMenu[user?.role.name || "manager"].main.url}
                />
              }
            />
            <Route
              element={
                <ProtectedRoute
                  isLoading={false}
                  isSuccess={user?.role.name === Roles.MANAGER}
                  onFailRedirectPath={AppRoutes.forbidden.url}
                />
              }
            >
              <Route path={AppRoutes.users.url} element={<UsersPage />} />
              <Route path={AppRoutes.menu.url} element={<MenuPage />} />
              <Route path={AppRoutes.reports.url} element={<ReportsPage />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isLoading={false}
                  isSuccess={user?.role.name === Roles.WAITER}
                  onFailRedirectPath={AppRoutes.forbidden.url}
                />
              }
            >
              <Route path={AppRoutes.orders.url} element={<OrdersPage />} />
              <Route
                path={AppRoutes.waiterMenu.url}
                element={<WaiterMenuPage />}
              />
              <Route path={AppRoutes.addOrder.url} element={<AddOrderPage />} />
              <Route
                path={AppRoutes.ordersHistory.url}
                element={<OrdersHistoryPage />}
              />
              <Route
                path={AppRoutes.waiterProfile.url}
                element={<WaiterProfilePage />}
              />
              <Route path={AppRoutes.dish.url} element={<DishPage />} />
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isLoading={false}
                  isSuccess={user?.role.name === Roles.KITCHEN}
                  onFailRedirectPath={AppRoutes.forbidden.url}
                />
              }
            >
              <Route
                path={AppRoutes.kitchenOrders.url}
                element={<KitchenOrdersPage />}
              />
            </Route>
            <Route path={AppRoutes.forbidden.url} element={<ForbiddenPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
