import React from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { ReactComponent as IconDogGreen } from "../../assets/icons/IconDogGreen.svg";

import styles from "./LoginPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { login } from "../../store/authSlice/authSlice";
import { LoadingStatuses } from "../../types/enums";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput/FormInput";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { authError, status, user } = useAppSelector((state) => state.auth);

  const onLogin = React.useCallback((data: any) => {
    dispatch(login({ login: data.login, password: data.password }));
  }, []);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  return (
    <div className={styles.loginPage}>
      <div>
        <IconDogGreen className={styles.icon} />
        <h2 className={styles.title}>Лучший корейский ресторан</h2>
      </div>
      <form className={styles.inputs} onSubmit={handleSubmit(onLogin)}>
        <FormInput
          control={control}
          errors={errors}
          name="login"
          placeholder="Логин"
          rules={{ required: "Поле обязательно для заполнения" }}
        />
        <FormInput
          control={control}
          errors={errors}
          name="password"
          placeholder="Пароль"
          rules={{ required: "Поле обязательно для заполнения" }}
          type="password"
        />
        {authError && <div className={styles.error}>{authError}</div>}
        <Button title="Войти" onClick={() => {}} type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
