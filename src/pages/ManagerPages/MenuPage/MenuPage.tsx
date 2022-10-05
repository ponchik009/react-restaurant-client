import React from "react";
import Button from "../../../components/Button/Button";

import styles from "./MenuPage.module.css";

const MenuPage = () => {
  return (
    <div className={styles.menuWrapper}>
      <Button
        title="Добавить блюдо"
        onClick={() => alert("Добавление блюда")}
        width="fit-content"
      />
    </div>
  );
};

export default MenuPage;
