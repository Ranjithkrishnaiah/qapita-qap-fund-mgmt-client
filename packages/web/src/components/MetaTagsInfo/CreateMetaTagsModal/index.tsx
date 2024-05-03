import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { ReactElement, useContext, useState } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../../../Context/TokenContext/TokenContextProvider";
import { metaTagsInterface } from "../MetaTagsTableBody/metaTagsInterface";
import "./createMetaTagsModal.scss";

const { Option } = Select;

type CreateMetaTagsModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  metaTags: metaTagsInterface[];
  setMetaTags: (a: metaTagsInterface[]) => void;
};

export const CreateMetaTagsModal = ({
  visible,
  setVisible,
  metaTags,
  setMetaTags,
}: CreateMetaTagsModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const [metaTagsCreate, setMetaTagsCreate] = useState<metaTagsInterface>();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getMetaTagsInfoService();

  const addMetaTagsInfo = () => {
    form.validateFields().then(() => {
      const postData = {
        id: metaTagsCreate?.id,
        name: metaTagsCreate?.name,
        values: metaTagsCreate?.values,
      };
      form.resetFields();

      service
        .postMetaTagsInfo(postData)

        .then((res) => {
          if (res.status === 200 || 204) {
            service.getMetaTagsInfo().then((res: any) => setMetaTags(res));
            message.success("Meta Tags created successfully");
          }
        })
        .then(() => setVisible(false));
    });
  };

  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      id: values.id,
      name: values.name,
      values: values.values,
    };
    setMetaTagsCreate(onValuesPostData);
  };

  const children: any = [];

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title="Create Meta Tags"
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
            onClick={addMetaTagsInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Submit" : "Please Wait"}
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
              // initialValue={firm?.organizationName.legalName}
              rules={[
                {
                  required: true,
                  message: "Please input the Meta Tag Name",
                },
              ]}
            >
              <Input
                name="name"
                placeholder="Add Tag"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Add Values */}
            <Form.Item
              name="values"
              label="Add Values"
              // initialValue={firm?.organizationName.legalName}
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
