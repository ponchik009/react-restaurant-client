import React from "react";
import MenuList from "../../../components/MenuList/MenuList";
import Button from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  createDish,
  fetchDish,
  fetchMenu,
  resetDish,
} from "../../../store/manuSlice/menuSlice";

import styles from "./MenuPage.module.css";
import MenuItemModal from "../../../components/MenuItemModal/MenuItemModal";

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menu);

  const [menuItemModalOpen, setMenuItemModalOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const onAddDishClick = React.useCallback(() => {
    dispatch(resetDish());
    setIsEditMode(false);
    setMenuItemModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setMenuItemModalOpen(false);
  }, []);

  const onMenuItemClick = React.useCallback((id: number) => {
    dispatch(fetchDish(id));
    setIsEditMode(true);
    setMenuItemModalOpen(true);
  }, []);

  React.useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <div className={styles.menuWrapper}>
      <Button
        title="Добавить блюдо"
        onClick={onAddDishClick}
        width="fit-content"
      />
      <MenuList menu={menu} onClick={onMenuItemClick} />
      <MenuItemModal
        isEdit={isEditMode}
        modalOpen={menuItemModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default MenuPage;
