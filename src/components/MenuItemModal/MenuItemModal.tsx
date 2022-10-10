import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DishTypesNames } from "../../const/conts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createDish, updateDish } from "../../store/manuSlice/menuSlice";
import { LoadingStatuses } from "../../types/enums";
import Button from "../Button/Button";
import FileUpload from "../FileUpload/FileUpload";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import Modal from "../Modal/Modal";

import styles from "./MenuItemModal.module.css";

interface IMenuItemModalProps {
  modalOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const MenuItemModal: React.FC<IMenuItemModalProps> = ({
  modalOpen,
  onClose,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const { fetchDishStatus, dish } = useAppSelector((state) => state.menu);
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  const [picture, setPicture] = React.useState(null);

  const onCreateClick = React.useCallback(
    (data: any) => {
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        if (typeof value === "object") {
          formData.append(key, (value! as any).value);
        } else {
          formData.append(key, value as any);
        }
      }
      formData.append("image", picture!);

      dispatch(createDish(formData));
      closeForm();
    },
    [picture]
  );

  const onUpdateClick = React.useCallback(
    (data: any) => {
      console.log(data);
      const formData = new FormData();
      for (let [key, value] of Object.entries(data)) {
        if (typeof value === "object") {
          formData.append(key, (value! as any).value);
        } else {
          formData.append(key, value as any);
        }
      }
      formData.append("image", picture!);

      dispatch(updateDish({ id: dish!.id, data: formData }));
      closeForm();
    },
    [picture, dish]
  );

  const closeForm = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  React.useEffect(() => {
    if (dish) {
      setValue("name", dish.name);
      setValue("description", dish.description);
      setValue("calories", dish.calories);
      setValue("cookingTime", dish.cookingTime);
      setValue("ingredients", dish.ingredients);
      setValue("weight", dish.weight);
      setValue("price", dish.price);
      setValue("isAlcoholic", dish.isAlcoholic || false);
      setValue("isVegan", dish.isVegan || false);
      setValue("dishType", {
        value: dish.dishType,
        label: DishTypesNames[dish.dishType],
      });
    } else {
      reset();
    }
  }, [dish]);

  const defaultPath = React.useMemo(
    () =>
      dish && dish.image
        ? `${process.env.REACT_APP_API_URL}/${dish?.image}`
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8NT9z0NaWgWZ_vw7XyP7rFNu8ZHvdcHqRHqWx9OVaTxfgGjm9_E8IpsWEFOgOQGTxPw&usqp=CAU",
    [dish]
  );

  return (
    <Modal
      open={modalOpen}
      onClose={closeForm}
      title={isEdit ? "Редактировать блюдо" : "Добавить блюдо"}
      headerColor="green"
      isLoading={fetchDishStatus === LoadingStatuses.PENDING}
    >
      <form
        onSubmit={handleSubmit(isEdit ? onUpdateClick : onCreateClick)}
        className={styles.form}
      >
        <div className={styles.mainBlock}>
          <FileUpload
            setFile={setPicture}
            accept="image/*"
            path={defaultPath}
          />
          <div className={styles.inputs}>
            <FormInput
              control={control}
              errors={errors}
              name="name"
              placeholder="Введите название"
              title="Название"
              rules={{ required: "Поле обязательно для заполнения" }}
            />
            <FormSelect
              control={control}
              errors={errors}
              name="dishType"
              placeholder="Выберите тип блюда"
              title="Тип блюда"
              rules={{ required: "Поле обязательно для заполнения" }}
              options={Object.entries(DishTypesNames).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <div className={styles.checkboxes}>
              <FormCheckbox
                control={control}
                errors={errors}
                name="isAlcoholic"
                rules={{}}
                title="Алкогольное"
              />
              <FormCheckbox
                control={control}
                errors={errors}
                name="isVegan"
                rules={{}}
                title="Вегетарианское"
              />
            </div>
          </div>
        </div>
        <FormInput
          control={control}
          errors={errors}
          name="description"
          placeholder="Введите описание"
          title="Описание"
          rules={{ required: "Поле обязательно для заполнения" }}
          rows={4}
        />
        <FormInput
          control={control}
          errors={errors}
          name="ingredients"
          placeholder="Введите интгредиенты"
          title="Интгредиенты"
          rules={{ required: "Поле обязательно для заполнения" }}
          rows={4}
        />
        <FormInput
          control={control}
          errors={errors}
          name="weight"
          placeholder="Введите вес блюда"
          title="Вес блюда"
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val: string) => {
              if (+val < 1) {
                return "Вес не может быть отрицательным";
              }
            },
          }}
          type="number"
        />
        <FormInput
          control={control}
          errors={errors}
          name="calories"
          placeholder="Введите калорийность блюда"
          title="Калорийность блюда"
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val: string) => {
              if (+val < 1) {
                return "Калорийность не может быть отрицательной";
              }
            },
          }}
          type="number"
        />
        <FormInput
          control={control}
          errors={errors}
          name="price"
          placeholder="Введите стоимость блюда"
          title="Стоимость блюда"
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val: string) => {
              if (+val < 1) {
                return "Стоимость не может быть отрицательной";
              }
            },
          }}
          type="number"
        />
        <FormInput
          control={control}
          errors={errors}
          name="cookingTime"
          placeholder="Введите время готовки блюда"
          title="Время готовки блюда"
          rules={{
            required: "Поле обязательно для заполнения",
            validate: (val: string) => {
              if (+val < 1) {
                return "Время готовки не может быть отрицательной";
              }
            },
          }}
          type="number"
        />
        <Button
          title={isEdit ? "Сохранить" : "Создать"}
          onClick={() => {}}
          type="submit"
        />
      </form>
    </Modal>
  );
};

export default MenuItemModal;
