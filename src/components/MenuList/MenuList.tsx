import React from "react";
import { IDish } from "../../types/apiTypes";
import MenuItem from "../MenuItem/MenuItem";

import styles from "./MenuList.module.css";

interface IMenuProps {
  menu: IDish[] | null;
  onClick: (id: number) => void;
}

const MenuList: React.FC<IMenuProps> = React.memo(({ menu, onClick }) => {
  return (
    <div className={styles.menuList}>
      {menu &&
        menu.map((dish) => {
          console.log(dish);
          return (
            <MenuItem
              key={dish.id}
              calories={dish.calories}
              image={dish.image}
              ingredients={dish.ingredients}
              price={dish.price}
              title={dish.name}
              weight={dish.weight}
              cookingTime={dish.cookingTime}
              isAlcoholic={dish.isAlcoholic}
              isVegan={dish.isVegan}
              type={dish.dishType}
              onClick={() => onClick(dish.id)}
            />
          );
        })}
    </div>
  );
});

export default MenuList;
