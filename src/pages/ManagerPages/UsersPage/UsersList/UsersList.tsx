import classNames from "classnames";
import React from "react";
import { RolesNames } from "../../../../const/conts";
import { IUser } from "../../../../types/apiTypes";

import { ReactComponent as IconCancel } from "../../../../assets/icons/IconCancel.svg";
import { ReactComponent as IconEdit } from "../../../../assets/icons/IconEdit.svg";
import { ReactComponent as IconAdd } from "../../../../assets/icons/IconAdd.svg";

import styles from "./UsersList.module.css";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { fetchUserById } from "../../../../store/usersSlice/usersSlice";
import { LoadingStatuses } from "../../../../types/enums";

interface IUsersListProps {
  data: IUser[];
  onEditClick: (id: number) => void;
  onBlockClick: (id: number) => void;
  onUnblockClick: (id: number) => void;
}

const UsersList: React.FC<IUsersListProps> = ({
  data,
  onEditClick,
  onBlockClick,
  onUnblockClick,
}) => {
  const dispatch = useAppDispatch();
  const { user: loggedInUser } = useAppSelector((state) => state.auth);
  const { currentUser, fetchUserStatus } = useAppSelector(
    (state) => state.users
  );

  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [confirmModalTitle, setConfirmModalTitle] = React.useState("");

  React.useEffect(() => {
    setConfirmModalTitle(
      `Вы действительно хотите ${
        currentUser?.deletedAt === null ? "заблокировать" : "разблокировать"
      } пользователя ${currentUser?.name}?`
    );
  }, [currentUser]);

  const iconBlockClick = React.useCallback((user: IUser) => {
    dispatch(fetchUserById(user.id));
    setConfirmModalOpen(true);
  }, []);

  const onOkClick = React.useCallback(() => {
    if (currentUser?.deletedAt === null) {
      onBlockClick(currentUser.id);
    } else {
      onUnblockClick(currentUser!.id);
    }
    setConfirmModalOpen(false);
  }, [currentUser]);

  const onCancelClick = React.useCallback(() => setConfirmModalOpen(false), []);

  return (
    <>
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
                    <IconEdit
                      className={styles.icon}
                      onClick={() => onEditClick(user.id)}
                    />
                    {loggedInUser?.id !== user.id &&
                      (user.deletedAt === null ? (
                        <IconCancel
                          className={styles.icon}
                          onClick={() => iconBlockClick(user)}
                        />
                      ) : (
                        <IconAdd
                          className={styles.icon}
                          onClick={() => iconBlockClick(user)}
                        />
                      ))}
                  </span>
                </div>
                <hr className={styles.tableRowLine} />
              </div>
            ))}
        </div>
      </div>
      <ModalConfirm
        title={confirmModalTitle}
        open={confirmModalOpen && fetchUserStatus === LoadingStatuses.FULFILED}
        onClose={onCancelClick}
        onOkClick={onOkClick}
        onCancelClick={onCancelClick}
      />
    </>
  );
};

export default UsersList;
