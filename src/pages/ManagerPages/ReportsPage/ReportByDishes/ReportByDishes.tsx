import React from "react";
import { IReportByDishesItem } from "../../../../types/apiTypes";

import styles from "./ReportByDishes.module.css";

interface IReportByDishesProps {
  report: IReportByDishesItem[];
}

const ReportByDishes: React.FC<IReportByDishesProps> = ({ report }) => {
  const [sortCol, setSortCol] = React.useState("№");
  const [isAscSort, setIsAscSort] = React.useState(true);

  const sortedReport = React.useMemo(() => {
    switch (sortCol) {
      case "№":
        return [...report].sort((item1, item2) =>
          isAscSort ? item1.id - item2.id : item2.id - item1.id
        );
      case "name":
        return [...report].sort((item1, item2) =>
          isAscSort
            ? item1.name.localeCompare(item2.name)
            : item2.name.localeCompare(item1.name)
        );
      case "count":
        return [...report].sort((item1, item2) =>
          isAscSort ? item1.count - item2.count : item2.count - item1.count
        );
      case "total":
        return [...report].sort((item1, item2) =>
          isAscSort
            ? item1.totalPrice - item2.totalPrice
            : item2.totalPrice - item1.totalPrice
        );
      case "price":
        return [...report].sort((item1, item2) =>
          isAscSort
            ? item1.currentPrice - item2.currentPrice
            : item2.currentPrice - item1.currentPrice
        );
      case "%":
        return [...report].sort((item1, item2) =>
          isAscSort
            ? item1.percent - item2.percent
            : item2.percent - item1.percent
        );
    }

    return [];
  }, [sortCol, isAscSort, report]);

  const changeSort = React.useCallback(
    (newValue: string) => {
      if (newValue === sortCol) {
        setIsAscSort((prev) => !prev);
      } else {
        setSortCol(newValue);
        setIsAscSort(true);
      }
    },
    [sortCol]
  );

  return (
    <table className={styles.report}>
      <thead className={styles.reportHeader}>
        <tr className={styles.row}>
          <td className={styles.cell} onClick={() => changeSort("№")}>
            №
          </td>
          <td className={styles.cell} onClick={() => changeSort("name")}>
            Название
          </td>
          <td className={styles.cell} onClick={() => changeSort("count")}>
            Общее кол-во заказов
          </td>
          <td className={styles.cell} onClick={() => changeSort("total")}>
            Общая сумма выручки
          </td>
          <td className={styles.cell} onClick={() => changeSort("price")}>
            Цена на текущий момент
          </td>
          <td className={styles.cell} onClick={() => changeSort("%")}>
            Процент присутствия в заказах
          </td>
        </tr>
      </thead>
      <tbody className={styles.reportBody}>
        {sortedReport.map((item, index) => (
          <tr key={item.name} className={styles.row}>
            <td className={styles.cell}>
              {isAscSort ? index + 1 : sortedReport.length - index}
            </td>
            <td className={styles.cell}>{item.name}</td>
            <td className={styles.cell}>{item.count}</td>
            <td className={styles.cell}>{item.totalPrice}</td>
            <td className={styles.cell}>{item.currentPrice}</td>
            <td className={styles.cell}>{item.percent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportByDishes;
