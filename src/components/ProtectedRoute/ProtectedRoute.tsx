import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingStatuses } from "../../types/enums";
import Loader from "../Loader/Loader";

interface IProtectedRouteProps {
  loadingStatus: LoadingStatuses;
  redirectPath: string;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  loadingStatus,
  redirectPath,
}) => {
  return (
    <>
      {loadingStatus === LoadingStatuses.PENDING ? (
        <Loader />
      ) : loadingStatus === LoadingStatuses.FULFILED ? (
        <Outlet />
      ) : (
        <Navigate to={redirectPath} />
      )}
    </>
  );
};

export default ProtectedRoute;
