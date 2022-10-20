import React from "react";
import { useNavigate } from "react-router-dom";
import Select, { MultiValue, Options } from "react-select";
import { IOption } from "../../../components/FormSelect/FormSelect";
import MenuList from "../../../components/MenuList/MenuList";
import { DishTypesNames } from "../../../const/conts";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchMenu } from "../../../store/menuSlice/menuSlice";

import styles from "./WaiterMenuPage.module.css";

const WaiterMenuPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menu);

  const options = React.useMemo(
    () =>
      Object.entries(DishTypesNames).map(([value, label]) => ({
        value,
        label,
      })),
    []
  );

  const [dishTypes, setDishTypes] = React.useState<MultiValue<IOption>>([]);
  const handleDishTypesChange = (options: MultiValue<IOption>) =>
    setDishTypes(options);

  React.useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  const onMenuItemClick = React.useCallback((id: number) => {
    navigate(`/dish/${id}`);
  }, []);

  return (
    <div>
      <div className={styles.pageHeader}>
        <Select
          onChange={handleDishTypesChange}
          value={dishTypes}
          options={options}
          placeholder="Типы блюд"
          isMulti={true}
        />
      </div>
      <MenuList menu={menu} onClick={onMenuItemClick} />
    </div>
  );
};

export default WaiterMenuPage;
