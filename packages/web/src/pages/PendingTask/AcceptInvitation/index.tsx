import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useState } from "react";
// import axios from "axios";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import "./Acceptinvitation.scss";
import Title from "antd/lib/typography/Title";
import { TokenContext } from "../../../Context/TokenContext/TokenContextProvider";

type AcceptInvitationModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
};

export const AcceptInvitation = ({
  visible,
  setVisible,
}: AcceptInvitationModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const { slugId } = useContext(ApplicationContext);
  const [form] = Form.useForm();
  const [test, setTest] = useState();

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title="CapFund Access Invite"
        className="newStyle1 popupModalClass createMetaTagsModal"
        width={800}
      >
        <div className="modalText">
          <p>You have been invited to join</p>
          <span>Invited Date and time:25th Oct 2021 ,5:30am</span>
          <span>Task Status:Pending</span> <br />
          <Button key="submit" className="sendInviteBtn firmProfileUpdateBtn">
            Accept Invite
          </Button>
        </div>
      </Modal>
    </>
  );
};
