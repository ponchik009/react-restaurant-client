import React from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import UsersList from "./UsersList/UsersList";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchUsers } from "../../../store/usersSlice/usersSlice";

import styles from "./UsersPage.module.css";
import UserModal from "./UserModal/UserModal";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users, fetchUsersError, fetchUsersStatus } = useAppSelector(
    (state) => state.users
  );

  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);

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
        onBanClick={() => setConfirmModalOpen(true)}
        onEditClick={() => setUserModalOpen(true)}
      />
      <UserModal
        modalOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
      />
      <ModalConfirm
        title="Вы действительно хотите чё-то там?"
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onOkClick={() => alert("ok")}
        onCancelClick={() => alert("cancel")}
      />
    </div>
  );
};

export default UsersPage;
