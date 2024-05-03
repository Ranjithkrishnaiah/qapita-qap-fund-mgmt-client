import React, { useState, useContext } from "react";
import "./reminderModal.scss";
import { Modal, Button, message } from "antd";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { ReminderArray } from "../../../../pages/ManageUsers";

type ReminderModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  onCancel: () => void;
  reminderArray: ReminderArray[];
  setIsReminded: (a: boolean) => void;
  setCheckAll: (a: boolean) => void;
};

export const ReminderModal = ({
  visible,
  setVisible,
  onCancel,
  reminderArray,
  setIsReminded,
  setCheckAll,
}: ReminderModalProps) => {
  const [loading, setLoading] = useState(false);
  const { getClient, slugId } = useContext(ApplicationContext);
  const client = getClient().getInvitationsService();

  const showInviteSendMsg = (arr: ReminderArray[]) => {
    if (arr.length === 1) {
      message.success("Reminder is Sent", 3);
    } else if (arr.length > 1) {
      message.success("Reminders are Sent", 3);
    }
  };

  const handleSendReminder = async () => {
    setIsReminded(true);

    if (reminderArray.length !== 0) {
      for (let i = 0; i < reminderArray.length; i++) {
        await client
          .sendReminder(reminderArray[i].invitationId, {
            invitationId: reminderArray[i].invitationId,
          })
          .catch((e) => console.log(e));
      }
      setIsReminded(false);
      setCheckAll(false);
      setVisible(false);
      showInviteSendMsg(reminderArray);
      //emptying reminder array
      reminderArray.length = 0;
    } else {
      message.error("No Users Selected");
    }
  };

  const handleModalClose = () => {
    setCheckAll(false);
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleModalClose}
      centered
      title="Send Reminder"
      footer={[
        <Button key="cancel" onClick={handleModalClose}>
          Back
        </Button>,
        <Button
          key="delete"
          className="reminderBtn"
          onClick={handleSendReminder}
        >
          Send Reminder
        </Button>,
      ]}
      confirmLoading={loading}
      className="newStyle"
    >
      <p className="reminderText">
        Send a reminder email to selected users for pending invites.
      </p>
      <p className="reminderText">
        No of users selected :{" "}
        <span className="numOfReminder">{reminderArray.length}</span>
      </p>
      <br />
      <p className="reminderInfo">
        On clicking button Send Reminder, an email will be triggered and sent to
        all the selected users.
      </p>
    </Modal>
  );
};
