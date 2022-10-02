import React from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { ReactComponent as IconDogGreen } from "../../assets/icons/IconDogGreen.svg";

import styles from "./LoginPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login } from "../../store/authSlice/authSlice";
import { LoadingStatuses } from "../../types/enums";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { authError, status, user } = useAppSelector((state) => state.auth);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onLogin = React.useCallback(() => {
    dispatch(login({ login: username, password }));
  }, [username, password]);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className={styles.loginPage}>
      <div>
        <IconDogGreen className={styles.icon} />
        <h2 className={styles.title}>Лучший корейский ресторан</h2>
      </div>
      <div className={styles.inputs}>
        <Input
          disabled={false}
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          disabled={false}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {authError && authError}
      <Button title="Войти" onClick={onLogin} />
    </div>
  );
};

export default LoginPage;
