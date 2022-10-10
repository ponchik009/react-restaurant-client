import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "../../../../components/Button/Button";
import FormInput from "../../../../components/FormInput/FormInput";
import FormSelect from "../../../../components/FormSelect/FormSelect";
import Input from "../../../../components/Input/Input";
import Modal from "../../../../components/Modal/Modal";
import { RolesNames } from "../../../../const/conts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import {
  createUser,
  updateUser,
} from "../../../../store/usersSlice/usersSlice";
import { LoadingStatuses, Roles } from "../../../../types/enums";

import styles from "./UserModal.module.css";

interface IUserModalProps {
  modalOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const UserModal: React.FC<IUserModalProps> = ({
  modalOpen,
  onClose,
  isEdit = false,
}) => {
  const dispatch = useAppDispatch();
  const { currentUser, fetchOneUserStatus, roles } = useAppSelector(
    (state) => state.users
  );

  const onCreateClick = React.useCallback((data: any) => {
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

  const onUpdateClick = React.useCallback(
    (data: any) => {
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
    },
    [currentUser]
  );

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  React.useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser.login);
      setValue("name", currentUser.name);
      setValue("role", {
        label: RolesNames[currentUser.role.name],
        value: currentUser.role.id,
      });
    } else {
      reset();
    }
  }, [currentUser]);

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
      isLoading={fetchOneUserStatus === LoadingStatuses.PENDING}
    >
      <form
        onSubmit={handleSubmit(isEdit ? onUpdateClick : onCreateClick)}
        className={styles.form}
      >
        <FormInput
          control={control}
          errors={errors}
          name="name"
          placeholder="Введите ФИО"
          title="Ф.И.О."
          rules={{ required: "Поле обязательно для заполнения" }}
        />
        <FormSelect
          options={
            roles?.map((role) => ({
              label: RolesNames[role.name],
              value: role.id,
            })) || []
          }
          control={control}
          errors={errors}
          name="role"
          placeholder="Выберите должность"
          title="Должность"
          rules={{ required: "Поле обязательно для заполнения" }}
        />
        <FormInput
          control={control}
          errors={errors}
          name="username"
          placeholder="Введите логин"
          title="Логин"
          rules={{ required: "Поле обязательно для заполнения" }}
        />
        <div className={styles.passwordBlock}>
          <FormInput
            control={control}
            errors={errors}
            name="password"
            type="password"
            placeholder="Введите пароль"
            title={isEdit ? "Новый пароль" : "Пароль"}
            rules={{
              required: isEdit ? false : "Поле обязательно для заполнения",
            }}
          />
          <FormInput
            control={control}
            errors={errors}
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            title="Подтверждение пароля"
            rules={{
              required: isEdit ? false : "Поле обязательно для заполнения",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Пароли не совпадают";
                }
              },
            }}
          />
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
