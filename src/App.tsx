import React from "react";
import AppRouter from "./components/AppRounter/AppRouter";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { login, selectUser } from "./store/authSlice/authSlice";

function App() {
  return <AppRouter />;
}

export default App;
