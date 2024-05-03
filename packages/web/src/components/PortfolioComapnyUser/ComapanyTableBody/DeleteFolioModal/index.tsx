import { Button, Form, Input, message, Modal, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React, { ReactElement, useContext, useEffect, useState } from "react";
import { EditInterface } from "..";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import FolderIcon from "../../../shared/icons/FolderIcon";

type DeletePortfolioModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  documentId: EditInterface | undefined;
  companyId: string;
};

export const DeletePortfolioModal = ({
  visible,
  setVisible,
  documentId,
  companyId,
}: DeletePortfolioModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();

  const deleteFolder = () => {
    service
      .deleteFolder(companyId, documentId?.id || "")

      .then(() => setVisible(false))
      .catch((err) => console.log(err));

    setLoadingSpinner(true);
    message.success("Folder Delete successfully");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title={
          <div>
            <span className="Icon">
              <FolderIcon />
            </span>
            Delete The Folder
          </div>
        }
        footer={[
          <Button
            key="cancel"
            className="firmProfileCancelBtn"
            onClick={onCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="sendInviteBtn firmProfileUpdateBtn"
            onClick={deleteFolder}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Delete" : "Please Wait"}
          </Button>,
        ]}
        className="newstyle3 folder "
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          className="Newfolder1"
          // onValuesChange={onValuesChange}
        >
          Are you sure you want to Delete the Folder?
        </Form>
      </Modal>
    </>
  );
};
