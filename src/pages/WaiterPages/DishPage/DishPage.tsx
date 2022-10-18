import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { usePreloader } from "../../../hooks/usePreloader";
import { fetchDish } from "../../../store/menuSlice/menuSlice";
import { DishTypes, LoadingStatuses } from "../../../types/enums";

import { ReactComponent as IconVine } from "../../../assets/icons/IconVine.svg";
import { ReactComponent as IconVegan } from "../../../assets/icons/IconVegan.svg";

import styles from "./DishPage.module.css";

import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import ChooseCountModal from "../../../components/ChooseCountModal/ChooseCountModal";
import {
  addDishToOrder,
  createOrder,
} from "../../../store/orderSlice/ordersSlice";
import { AppRoutes } from "../../../const/conts";

const DishPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { dish, fetchDishStatus } = useAppSelector((state) => state.menu);
  const { order } = useAppSelector((state) => state.orders);

  const [chooseCountModalOpen, setChooseCountModalOpen] = React.useState(false);

  const onOkClick = React.useCallback(
    (data: any) => {
      setChooseCountModalOpen(false);
      dispatch(addDishToOrder({ ...data, dish }));
      navigate(AppRoutes.waiterMenu.url);
    },
    [dish]
  );

  const onModalClose = React.useCallback(
    () => setChooseCountModalOpen(false),
    []
  );

  const { isPreloaderShow } = usePreloader(
    fetchDishStatus === LoadingStatuses.PENDING
  );

  React.useEffect(() => {
    dispatch(fetchDish(+id!));
  }, []);

  if (!dish && !isPreloaderShow) return null;

  return (
    <>
      {isPreloaderShow ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
      ) : (
        fetchDishStatus === LoadingStatuses.FULFILED && (
          <div className={styles.dishWrapper}>
            <img
              src={`${process.env.REACT_APP_API_URL}/${dish?.image}`}
              alt={dish?.name}
            />
            <div className={styles.dishData}>
              <div className={styles.dishMainInfo}>
                <h3 className={styles.dishName}>{dish?.name}</h3>
                <span>{dish?.price}р</span>
              </div>
              <div>
                <h4>Описание</h4>
                <p>{dish?.description}</p>
              </div>
              <div>
                <h4>Ингредиенты</h4>
                <p>{dish?.ingredients}</p>
              </div>
              <div className={styles.dishCharacteristics}>
                <div className={styles.dishCiphers}>
                  <span>
                    {dish?.weight}{" "}
                    {dish?.dishType === DishTypes.DRINK ? "мл" : "гр"}.
                  </span>
                  <span>{dish?.calories} ккал.</span>
                  <span>{dish?.cookingTime} мин.</span>
                </div>
                <div className={styles.dishIcons}>
                  {dish?.isAlcoholic && (
                    <span className={styles.dishPrice}>
                      <IconVine />
                    </span>
                  )}
                  {dish?.isVegan && (
                    <span className={styles.dishPrice}>
                      <IconVegan />
                    </span>
                  )}
                </div>
              </div>
              <Button
                title="Добавить в заказ"
                onClick={() => setChooseCountModalOpen(true)}
                color="orange"
              />
            </div>
            <ChooseCountModal
              open={chooseCountModalOpen}
              onClose={onModalClose}
              title="Выберите количество"
              onOkClick={onOkClick}
              buttonText="Добавить"
            />
          </div>
        )
      )}
    </>
  );
};

export default DishPage;
