import { FolderOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";

import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import FolderIcon from "../../../shared/icons/FolderIcon";

import "./folderModal.scss";
import { newFolderInterface } from "./NewFolderInterface";
import { useHistory } from "react-router";
import { isEmpty } from "lodash";

const { TextArea } = Input;

let history;

type NewFolderModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  compnayid: string;
  selectedFolderPath: string;
};

const { Option } = Select;

const children = [];

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export const NewFolderModal = ({
  visible,
  setVisible,
  compnayid,
  selectedFolderPath: selectedFolderPath,
}: NewFolderModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [size, setSize] = React.useState("default");
  const [folder, setFolder] = useState<newFolderInterface>({
    name: "",
    description: "",
    folderPath: "",
    documentType: "Folder",
  });

  //using userTokenContext
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();

  history = useHistory();

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  if (selectedFolderPath) {
    folder.folderPath = selectedFolderPath;
  }

  const SubmitData = (e) => {
    form.validateFields().then(() => {
      const formData: any = new FormData();
      formData.append("name", folder.name);
      formData.append("description", folder.description);
      formData.append("folderPath", folder.folderPath);

      service.createFolder(formData, compnayid);

      setLoadingSpinner(true);
      message.success("Folder created successfully");
      setTimeout(function () {
        window.location.reload();
      }, 500);
    });
  };

  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      name: values.name,
      description: values.description,
      folderPath: values.folderPath,
      documentType: "Folder",
    };
    setFolder(onValuesPostData);
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
            New Folder
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
            onClick={SubmitData}
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
              initialValue={folder?.name}
            >
              <Input placeholder="Annual Financial" />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="description"
              label="Description"
              className="InputText"
              initialValue={folder?.description}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div style={{ display: "none" }}>
            <Form.Item
              name="folderPath"
              label="folderPath"
              className="InputText"
              initialValue={folder?.folderPath}
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
