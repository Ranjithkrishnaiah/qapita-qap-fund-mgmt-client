import React, { useContext, useEffect } from "react";
import "./deleteUserModal.scss";
import { Modal, Button } from "antd";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { User } from "../../../../pages/ManageUsers";

type DeleteUserModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  onCancel: () => void;
  firstName: string;
  lastName: string;
  setUsers: (a: User[]) => void;
  invitationId: string;
  setPopupVisible: (a: boolean) => void;
  userId: string;
  page: number;
  pageSize: number;
  // statusList: string[];
  // roleList: string[];
  setTotalResult: (a: number) => void;
};

export const DeleteUserModal = ({
  visible,
  setVisible,
  onCancel,
  firstName,
  lastName,
  setUsers,
  invitationId,
  setPopupVisible,
  userId,
  page,
  pageSize,
  setTotalResult,
}: // statusList,
// roleList,
DeleteUserModalProps) => {
  const { getClient } = useContext(ApplicationContext);
  const service = getClient().getInvitationsService();

  const handleDelete = () => {
    // const status = statusList.toString();
    // const roles = roleList.toString();

    service
      .deleteUser(userId)
      .then(() => {
        service.getUser({ page, page_size: pageSize }).then((res: any) => {
          setUsers(res.data);
          setTotalResult(res.totalCount);
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (visible) {
      setPopupVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <Modal
      centered
      title="Remove User"
      onCancel={onCancel}
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" className="deleteUserBtn" onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p className="deleteWarning">
        Are you sure you want to delete user
        <strong style={{ textTransform: "capitalize", color: "#633ea5" }}>
          {firstName} {lastName}
        </strong>
        from QapFund?
      </p>
    </Modal>
  );
};
