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

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, fetchUsersError, fetchUsersStatus, fetchUserStatus } =
    useAppSelector((state) => state.users);

  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const onCreateClick = React.useCallback(() => {
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
      {userModalOpen && fetchUserStatus !== LoadingStatuses.PENDING && (
        <UserModal
          modalOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          isEdit={isEditMode}
        />
      )}
    </div>
  );
};

export default UsersPage;
