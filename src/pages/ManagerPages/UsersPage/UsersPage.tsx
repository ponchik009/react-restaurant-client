import React from "react";
import Button from "../../../components/Button/Button";
import UsersList from "./UsersList/UsersList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  blockUser,
  fetchRoles,
  fetchUserById,
  fetchUsers,
  resetUser,
  unblockUser,
} from "../../../store/usersSlice/usersSlice";

import styles from "./UsersPage.module.css";
import UserModal from "./UserModal/UserModal";
import { LoadingStatuses } from "../../../types/enums";
import Badge from "../../../components/Alert/Alert";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    fetchAllUsersStatus,
    fetchOneUserStatus,
    fetchSaveUserStatus,
  } = useAppSelector((state) => state.users);

  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const [openBadge, setOpenBadge] = React.useState(false);

  React.useEffect(() => {
    if (
      fetchSaveUserStatus === LoadingStatuses.FULFILED ||
      fetchSaveUserStatus === LoadingStatuses.REJECTED
    ) {
      setOpenBadge(true);
    }
  }, [fetchSaveUserStatus]);

  const onCreateClick = React.useCallback(() => {
    dispatch(resetUser());
    setIsEditMode(false);
    setUserModalOpen(true);
  }, []);

  const onBlockUser = React.useCallback(
    (id: number) => dispatch(blockUser(id)),
    []
  );
  const onUnblockUser = React.useCallback(
    (id: number) => dispatch(unblockUser(id)),
    []
  );
  const onEditUser = React.useCallback((id: number) => {
    setUserModalOpen(true);
    setIsEditMode(true);
    dispatch(fetchUserById(id));
  }, []);

  React.useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, []);

  return (
    <div className={styles.usersWrapper}>
      <div>
        <Button title="Создать пользователя" onClick={onCreateClick} />
      </div>
      <UsersList
        data={users || []}
        onBlockClick={onBlockUser}
        onUnblockClick={onUnblockUser}
        onEditClick={onEditUser}
      />
      <UserModal
        modalOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        isEdit={isEditMode}
      />
      <Badge
        onClose={() => setOpenBadge(false)}
        open={openBadge}
        title={
          fetchSaveUserStatus === LoadingStatuses.FULFILED
            ? "Успех!"
            : "Что-то пошло не так..."
        }
        color={
          fetchSaveUserStatus === LoadingStatuses.FULFILED ? "green" : "red"
        }
      />
    </div>
  );
};

export default UsersPage;
