import {
  Button,
  Descriptions,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

import React, { ReactElement, useContext, useEffect, useState } from "react";
import { EditInterface } from "..";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import FolderIcon from "../../../shared/icons/FolderIcon";
import { newFolderInterface } from "../../CompanyModal/FolderModal/NewFolderInterface";

type EditPortfolioModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  documentId: EditInterface | undefined;
  companyId: string;
};

export const EditPortfolioModal = ({
  visible,
  setVisible,
  documentId,
  companyId,
}: EditPortfolioModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();
  const [update, setUpdate] = useState<newFolderInterface>();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();

  const updateFolder = () => {
    const postData = {
      name: update?.name || documentId?.name,
      description: update?.description || documentId?.description,
      folderPath: update?.folderPath || documentId?.folderPath,
      documentType: "Folder",
    };

    service.updateFolder(postData, companyId, documentId?.id as string);
    setLoadingSpinner(true);
    message.success("Data Edit is successfully");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      name: values.name,
      description: values.description,
      folderPath: values.folderPath,
      documentType: "Folder",
    };
    setUpdate(onValuesPostData);
  };

  console.log(update);

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
            Edit Folder
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
            onClick={updateFolder}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Save" : "Please Wait"}
          </Button>,
        ]}
        className="newstyle3 folder "
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          className="Newfolder1"
          onValuesChange={onValuesChange}
        >
          <div>
            <Form.Item
              name="name"
              label="Name"
              id="name1"
              className="InputText"
              initialValue={documentId?.name}
            >
              <Input placeholder="Annual Financial" />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="description"
              label="Description"
              className="InputText"
              initialValue={documentId?.description}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div style={{ display: "none" }}>
            <Form.Item
              name="folderPath"
              label="folderPath"
              className="InputText"
              initialValue={documentId?.folderPath}
            >
              <Input />
            </Form.Item>
          </div>

          {/* <div>
            <p className="notiText">Notifications will be sent to:</p>
            <span className="CheckBoxtext">
              <Checkbox style={{ marginBottom: "20px" }}>
                Everyone who can see this folder
              </Checkbox>
            </span>
          </div>

          <div>
            <Form.Item
              name="corporateNumber"
              label="Assign to Individual"
              className="InputText"
            >
              <Input placeholder="Serach for group" />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="corporateNumber"
              label="Selected Users"
              className="InputText"
            >
              <Select
                mode="tags"
                size="large"
                placeholder="Please select"
                defaultValue={["Dhaval@gmail.com", "Rama@gmail.com"]}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                {children}
              </Select>
            </Form.Item>
          </div> */}
        </Form>
      </Modal>
    </>
  );
};
