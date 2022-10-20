import React from "react";
import { DishTypes } from "../../types/enums";
import { DishTypesNames } from "../../const/conts";

import { ReactComponent as IconVegan } from "../../assets/icons/IconVegan.svg";
import { ReactComponent as IconVine } from "../../assets/icons/IconVine.svg";

import styles from "./MenuItem.module.css";
import Chip from "../Chip/Chip";

interface IMenuItemProps {
  image: string;
  title: string;
  ingredients: string;
  weight: number;
  calories: number;
  cookingTime: number;
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
  cookingTime,
  onClick,
}) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.dishInfo}>
        <img
          src={`${process.env.REACT_APP_API_URL}/${image}`}
          alt={title}
          className={styles.itemImage}
        />
        <div className={styles.mainRow}>
          <h4 className={styles.title}>{title}</h4>
          <Chip title={DishTypesNames[type]} />
        </div>
        <p className={styles.ingredients}>{ingredients}</p>
      </div>
      <div className={styles.dishNumbers}>
        <div className={styles.dishCharacteristics}>
          <div className={styles.dishCiphers}>
            <span>
              {weight} {type === DishTypes.DRINK ? "мл" : "гр"}.
            </span>
            <span>{calories} ккал.</span>
            <span>{cookingTime} мин.</span>
          </div>
          {isAlcoholic && (
            <span className={styles.dishPrice}>
              <IconVine />
            </span>
          )}
          {isVegan && (
            <span className={styles.dishPrice}>
              <IconVegan />
            </span>
          )}
        </div>
        <span className={styles.dishPrice}>{price}р</span>
      </div>
    </div>
  );
};

export default MenuItem;
