import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import FormInput from "../../../components/FormInput/FormInput";
import FormSelect from "../../../components/FormSelect/FormSelect";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchMenu } from "../../../store/menuSlice/menuSlice";
import { fetchReportByDishes } from "../../../store/orderSlice/ordersSlice";
import ReportByDishes from "./ReportByDishes/ReportByDishes";

import styles from "./ReportsPage.module.css";

const ReportsPage = () => {
  const dispatch = useAppDispatch();
  const { reportByDishes } = useAppSelector((state) => state.orders);
  const { menu } = useAppSelector((state) => state.menu);

  React.useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({});

  const getReport = React.useCallback((data: any) => {
    console.log(data);
    dispatch(
      fetchReportByDishes({
        ...data,
        ids: data.dishes.map((dish: any) => dish.value),
      })
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 style={{ fontSize: "26px" }}>Отчёт по блюдам</h1>
      <form onSubmit={handleSubmit(getReport)} className={styles.form}>
        <div className={styles.dates}>
          с
          <FormInput
            control={control}
            errors={errors}
            name="dateStart"
            type="date"
            placeholder="Дата"
            rules={{ required: "Поле обязательно для заполнения" }}
          />
          по
          <FormInput
            control={control}
            errors={errors}
            name="dateEnd"
            type="date"
            placeholder="Дата"
            rules={{ required: "Поле обязательно для заполнения" }}
          />
        </div>
        <FormSelect
          options={
            menu?.map((dish) => ({
              label: dish.name,
              value: dish.id,
            })) || []
          }
          control={control}
          errors={errors}
          name="dishes"
          placeholder="Выберите блюда"
          title="Блюда"
          rules={{ required: "Поле обязательно для заполнения" }}
          isMulti={true}
        />
        <Button type="submit" title="Сформировать" onClick={() => {}} />
      </form>
      {reportByDishes && <ReportByDishes report={reportByDishes} />}
    </div>
  );
};

export default ReportsPage;
