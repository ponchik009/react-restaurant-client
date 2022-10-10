import React from "react";
import { DishTypesNames } from "../../const/conts";
import { DishTypes } from "../../types/enums";

import styles from "./MenuItem.module.css";

interface IMenuItemProps {
  image: string;
  title: string;
  ingredients: string;
  weight: number;
  calories: number;
  price: number;
  isAlcoholic?: boolean;
  isVegan?: boolean;
  type: DishTypes;
  onClick: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  image,
  title,
  ingredients,
  weight,
  calories,
  price,
  type,
  isAlcoholic = false,
  isVegan = false,
  onClick,
}) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.dishInfo}>
        <img
          src={`${process.env.REACT_APP_API_URL}${image}`}
          alt={title}
          className={styles.itemImage}
        />
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.ingredients}>{ingredients}</p>
      </div>
      <div className={styles.dishNumbers}>
        <div className={styles.dishCharacteristics}>
          <span>
            {weight} {type === DishTypes.DRINK ? "мл" : "гр"}.
          </span>
          <span>{calories} ккал.</span>
        </div>
        {isAlcoholic && <span className={styles.dishPrice}>алко</span>}
        {isVegan && <span className={styles.dishPrice}>веган</span>}
        <span className={styles.dishPrice}>{price}р</span>
      </div>
    </div>
  );
};

export default MenuItem;
