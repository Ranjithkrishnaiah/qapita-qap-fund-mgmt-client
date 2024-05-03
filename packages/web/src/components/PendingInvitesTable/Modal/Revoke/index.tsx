import React, { useEffect, useContext } from "react";
import "./revokeModal.scss";
import { Modal, Button } from "antd";
import axios from "axios";
import { User } from "../../../../pages/ManageUsers";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type RevokeModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  onCancel: () => void;
  firstName: string;
  lastName: string;
  setInvites: (a: Invite[]) => void;
  invitationId: string;
  setPopupVisible: (a: boolean) => void;
  page: number;
  itemsPerPage: number;
  statusList: string[];
  roleList: string[];
};

export const RevokeModal = ({
  visible,
  setVisible,
  onCancel,
  firstName,
  lastName,
  setInvites,
  invitationId,
  setPopupVisible,
  page,
  itemsPerPage,
  statusList,
  roleList,
}: RevokeModalProps) => {
  const { getClient, slugId } = useContext(ApplicationContext);
  const client = getClient().getInvitationsService();

  const handleRevoke = () => {
    const status = statusList.toString();
    const roles = roleList.toString();

    client
      .deleteInvitation(invitationId)
      .then(() => {
        client
          .getInvitations({ page, page_size: itemsPerPage, status, roles })
          .then((res: any) => setInvites(res.data));
      })
      .then(() => setVisible(false))
      .catch((err) => console.log(err));
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
      title="Revoke Invitation"
      onCancel={onCancel}
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" className="revokeBtn" onClick={handleRevoke}>
          Revoke
        </Button>,
      ]}
    >
      <p className="revokeWarning">
        Are you sure you want to revoke invitation of{" "}
        <strong
          style={{
            textTransform: "capitalize",
            color: "#633ea5",
          }}
        >
          {firstName} {lastName}
        </strong>{" "}
        from QapFund?
      </p>
    </Modal>
  );
};
