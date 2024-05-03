import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../../../../Context/TokenContext/TokenContextProvider";
import { metaTagsInterface } from "../metaTagsInterface";
import "./deleteMetaTagsModal.scss";

type DeleteMetaTagsModalProps = {
  visibleDelete: boolean;
  setVisibleDelete: (a: boolean) => void;
  metaTagId: string;
  metaTags: metaTagsInterface[];
  setMetaTags: (a: metaTagsInterface[]) => void;
};

export const DeleteMetaTagsModal = ({
  visibleDelete,
  setVisibleDelete,
  metaTagId,
  metaTags,
  setMetaTags,
}: DeleteMetaTagsModalProps): ReactElement => {
  const onCancel = () => {
    setVisibleDelete(false);
  };

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getMetaTagsInfoService();

  const DeleteMetaTagsInfo = () => {
    if (metaTagId != "") {
      service
        .deleteMetaTagInfo(metaTagId)
        .then((res) => {
          if (res.status === 200 || 204) {
            service.getMetaTagsInfo().then((res: any) => setMetaTags(res));
            message.success("Meta Tags Deleted successfully");
          }
        })
        .then(() => setVisibleDelete(false));
    }
  };

  return (
    <>
      <Modal
        visible={visibleDelete}
        onCancel={onCancel}
        title="Delete Meta Tag"
        centered
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
            onClick={DeleteMetaTagsInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Delete" : "Please Wait"}
          </Button>,
        ]}
        className="newStyle popupModalClass createMetaTagsModal"
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm createMetaTagsForm"
        >
          <div className="createMetaTags__block">
            <h3 className="deleteMetaTag__title">
              Are you sure you want to Delete Meta Tag?
            </h3>
          </div>
        </Form>
      </Modal>
    </>
  );
};
