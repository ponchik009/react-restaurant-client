import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { login, selectUser } from "./store/authSlice/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    dispatch(login({ login: "123", password: "123" }));
  }, []);
  return <div className="App">123</div>;
}

export default App;
