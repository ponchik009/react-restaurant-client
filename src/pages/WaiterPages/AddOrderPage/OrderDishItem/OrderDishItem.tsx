import React from "react";
import { IOrderDish } from "../../../../types/apiTypes";

import { ReactComponent as IconPlus } from "../../../../assets/icons/IconClose.svg";

import styles from "./OrderDishItem.module.css";

interface IOrderDishItemProps {
  orderDish: IOrderDish;
  onDelete: (id: number) => void;
  onClick: (dish: IOrderDish) => void;
}

const OrderDishItem: React.FC<IOrderDishItemProps> = ({
  orderDish,
  onDelete,
  onClick,
}) => {
  const closeClick = React.useCallback(
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      onDelete(orderDish.dish.id);
    },
    [onDelete]
  );

  return (
    <div className={styles.card} onClick={(e) => onClick(orderDish)}>
      <IconPlus className={styles.delete} onClick={closeClick} />
      <img
        src={`${process.env.REACT_APP_API_URL}/${orderDish.dish.image}`}
        alt={orderDish.dish.name}
      />
      <div className={styles.dish}>
        <div className={styles.dishInfo}>
          <div className={styles.dishMainInfo}>
            <h4>{orderDish.dish.name}</h4>
            <span>{orderDish.dish.cookingTime} мин.</span>
          </div>
          <span className={styles.dishComment}>
            Комментарий: {orderDish.comment}
          </span>
        </div>
        <span className={styles.dishPrice}>
          {orderDish.dish.price * orderDish.count}р
        </span>
      </div>

      <div className={styles.dishCount}>{orderDish.count}</div>
    </div>
  );
};

export default OrderDishItem;
