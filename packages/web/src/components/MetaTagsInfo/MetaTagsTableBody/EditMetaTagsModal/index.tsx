import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../../../../Context/TokenContext/TokenContextProvider";
import { metaTagsInterface } from "../metaTagsInterface";
import "./editMetaTagsModal.scss";
import { metaTagsEditInterface } from "./metaTagsEditInterface";

type EditMetaTagsModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  metaTagId: string;
  metaTags: metaTagsInterface[];
  setMetaTags: (a: metaTagsInterface[]) => void;
};

export const EditMetaTagsModal = ({
  visible,
  setVisible,
  metaTagId,
  metaTags,
  setMetaTags,
}: EditMetaTagsModalProps): ReactElement => {
  interface metaTagsEditInterface {
    name: string | undefined;
    values: string[] | undefined;
  }

  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getMetaTagsInfoService();

  const [metaTagsEdit, setMetaTagsEdit] = useState<metaTagsEditInterface>();

  useEffect(() => {
    if (visible === true) {
      service
        .getMetaTagsInfoMetatagId(metaTagId)
        .then((res) => setMetaTagsEdit(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaTagId, getClient, visible]);

  useEffect(() => {
    if (metaTagId != "") {
      service
        .getMetaTagsInfoMetatagId(metaTagId)
        .then((res) => setMetaTagsEdit(res));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, metaTagId, getClient]);

  const UpdateMetaTagsInfo = () => {
    form.validateFields();
    const updateData = {
      // id: metaTags?.id,
      name: metaTagsEdit?.name,
      values: metaTagsEdit?.values,
    };

    service
      .putMetaTagsInfo(metaTagId, updateData)
      .then((res) => {
        if (res.status === 200 || 204) {
          console.log("res.status", res.status);
          service.getMetaTagsInfo().then((res: any) => setMetaTags(res));
          message.success("Meta Tags Updated successfully");
        }
      })
      .then(() => setVisible(false));
  };
  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      // id: values.id,
      name: values.name,
      values: values.values,
    };
    setMetaTagsEdit(onValuesPostData);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: metaTagsEdit?.name,
      values: metaTagsEdit?.values,
    });
  }, [form, metaTagsEdit]);

  const children: any = [];

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title="Edit Meta Tags"
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
            onClick={UpdateMetaTagsInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Update" : "Please Wait"}
          </Button>,
        ]}
        className="newStyle popupModalClass createMetaTagsModal"
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm createMetaTagsForm"
          onValuesChange={onValuesChange}
        >
          <div className="createMetaTags__block">
            {/* Add Tag */}
            <Form.Item
              name="name"
              label="Add Tag"
              // initialValue={metaTagsEdit?.name}
              rules={[
                {
                  required: true,
                  message: "Please input the Meta Tag Name",
                },
              ]}
            >
              <Input
                name="addTag"
                placeholder="Add Tag"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Add Values */}
            <Form.Item
              name="values"
              label="Add Values"
              // initialValue={metaTagsEdit?.values}
              rules={[
                {
                  required: true,
                  message: "Please select the Meta Tag Values",
                },
              ]}
            >
              <Select
                mode="tags"
                placeholder="Add Values"
                bordered={false}
                className="firmProfileInputField"
              >
                {children}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
