import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "../../../../components/Button/Button";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { RolesNames } from "../../../../const/conts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import {
  createUser,
  updateUser,
} from "../../../../store/usersSlice/usersSlice";
import { Roles } from "../../../../types/enums";

import styles from "./UserModal.module.css";

interface IUserModalProps {
  modalOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
}

interface IOption {
  label: string;
  value: string | number;
}

const UserModal: React.FC<IUserModalProps> = ({
  modalOpen,
  onClose,
  isEdit = false,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser, fetchUserStatus, roles } = useAppSelector(
    (state) => state.users
  );

  const defaultValues = React.useMemo(
    () => ({
      username: isEdit ? currentUser!.login : "",
      password: "",
      confirmPassword: "",
      name: isEdit ? currentUser!.name : "",
      role: {
        label: RolesNames[currentUser?.role.name || Roles.MANAGER],
        value: currentUser?.role.id || 1,
      },
    }),
    []
  );

  const onCreateClick = React.useCallback((data: any) => {
    console.log("create");
    console.log(data);
    dispatch(
      createUser({
        login: data.username,
        name: data.name,
        password: data.password,
        roleId: data.role.value,
      })
    );
    closeForm();
  }, []);

  const onUpdateClick = React.useCallback((data: any) => {
    console.log("update");
    console.log(data);
    dispatch(
      updateUser({
        id: currentUser!.id,
        login: data.username,
        name: data.name,
        password: data.password,
        role: { id: data.role.value },
      })
    );
    closeForm();
  }, []);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const closeForm = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <Modal
      open={modalOpen}
      onClose={closeForm}
      title={isEdit ? "Редактировать пользователя" : "Создать пользователя"}
      headerColor="green"
    >
      <form
        onSubmit={handleSubmit(isEdit ? onUpdateClick : onCreateClick)}
        className={styles.form}
      >
        <div className={styles.inputBlock}>
          <div className={styles.title}>Ф.И.О.</div>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Input
                placeholder="Введите ФИО"
                onChange={onChange}
                value={value}
                isError={Boolean(errors.name)}
              />
            )}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </div>
        <div className={styles.inputBlock}>
          <div className={styles.title}>Должность</div>
          <Controller
            control={control}
            name="role"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                onChange={onChange}
                value={value}
                options={roles?.map((role) => ({
                  label: RolesNames[role.name],
                  value: role.id,
                }))}
                placeholder="Выберите должность"
              />
            )}
          />
          {errors.role && (
            <div className={styles.error}>{errors.role.message}</div>
          )}
        </div>
        <div className={styles.inputBlock}>
          <div className={styles.title}>Логин</div>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Поле обязательно для заполнения" }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Input
                placeholder="Введите логин"
                onChange={onChange}
                value={value}
                isError={Boolean(errors.username)}
              />
            )}
          />
          {errors.username && (
            <div className={styles.error}>{errors.username.message}</div>
          )}
        </div>
        <div className={styles.passwordBlock}>
          <div className={styles.inputBlock}>
            <div className={styles.title}>
              {isEdit ? "Новый пароль" : "Пароль"}
            </div>
            <Controller
              control={control}
              name="password"
              rules={{
                required: isEdit ? false : "Поле обязательно для заполнения",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Input
                  placeholder="Введите пароль"
                  onChange={onChange}
                  value={value}
                  isError={Boolean(errors.password)}
                  type="password"
                />
              )}
            />
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>
          <div className={styles.inputBlock}>
            <div className={styles.title}>Подтверждение пароля</div>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: isEdit ? false : "Поле обязательно для заполнения",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Пароли не совпадают";
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Input
                  placeholder="Подтвердите пароль"
                  onChange={onChange}
                  value={value}
                  isError={Boolean(errors.confirmPassword)}
                  type="password"
                />
              )}
            />
            {errors.confirmPassword && (
              <div className={styles.error}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
        </div>
        <Button
          title={isEdit ? "Сохранить" : "Создать"}
          onClick={() => {}}
          type="submit"
        />
      </form>
    </Modal>
  );
};

export default UserModal;
