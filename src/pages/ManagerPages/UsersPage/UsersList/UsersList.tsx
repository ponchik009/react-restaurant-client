import classNames from "classnames";
import React from "react";
import { RolesNames } from "../../../../const/conts";
import { IUser } from "../../../../types/apiTypes";

import { ReactComponent as IconCancel } from "../../../../assets/icons/IconCancel.svg";
import { ReactComponent as IconEdit } from "../../../../assets/icons/IconEdit.svg";

import styles from "./UsersList.module.css";

interface IUsersListProps {
  data: IUser[];
  onEditClick: () => void;
  onBanClick: () => void;
}

const UsersList: React.FC<IUsersListProps> = ({
  data,
  onEditClick,
  onBanClick,
}) => {
  return (
    <div>
      <div className={styles.tableTitle}>
        <span className={styles.tableTitleText}>ФИО</span>
        <span className={styles.tableTitleText}>Должность</span>
        <span className={styles.tableTitleText}>Статус</span>
        <span className={styles.tableTitleText}>Действия</span>
      </div>
      <div className={styles.tableBody}>
        {data.length > 0 &&
          data.map((user) => (
            <div key={user.id} className={styles.tableRow}>
              <div className={styles.tableRowContent}>
                <span className={styles.tableRowText}>{user.name}</span>
                <span className={styles.tableRowText}>
                  {RolesNames[user.role.name]}
                </span>
                <span
                  className={classNames(styles.tableRowText, {
                    [styles.active]: user.deletedAt === null,
                    [styles.blocked]: user.deletedAt !== null,
                  })}
                >
                  {user.deletedAt === null ? "Активен" : "Заблокирован"}
                </span>
                <span className={styles.tableRowText}>
                  <IconEdit className={styles.icon} onClick={onEditClick} />
                  <IconCancel className={styles.icon} onClick={onBanClick} />
                </span>
              </div>
              <hr className={styles.tableRowLine} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersList;
