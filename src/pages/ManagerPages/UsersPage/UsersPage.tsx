import React from "react";
import Button from "../../../components/Button/Button";
import UsersList from "./UsersList/UsersList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  blockUser,
  fetchUsers,
  unblockUser,
} from "../../../store/usersSlice/usersSlice";

import styles from "./UsersPage.module.css";
import UserModal from "./UserModal/UserModal";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, fetchUsersError, fetchUsersStatus } = useAppSelector(
    (state) => state.users
  );

  const [userModalOpen, setUserModalOpen] = React.useState(false);

  const onBlockUser = React.useCallback(
    (id: number) => dispatch(blockUser(id)),
    []
  );
  const onUnblockUser = React.useCallback(
    (id: number) => dispatch(unblockUser(id)),
    []
  );

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className={styles.usersWrapper}>
      <div>
        <Button
          title="Создать пользователя"
          onClick={() => setUserModalOpen(true)}
        />
      </div>
      <UsersList
        data={users || []}
        onBlockClick={onBlockUser}
        onUnblockClick={onUnblockUser}
        onEditClick={() => setUserModalOpen(true)}
      />
      <UserModal
        modalOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />
    </div>
  );
};

export default UsersPage;
