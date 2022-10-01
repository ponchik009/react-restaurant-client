import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import TestPage from "../../pages/TestPage/TestPage";
import { fetchUser } from "../../store/authSlice/authSlice";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { user, status, authError } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute loadingStatus={status} redirectPath="/login" />
        }
      >
        <Route path="/test" element={<TestPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
