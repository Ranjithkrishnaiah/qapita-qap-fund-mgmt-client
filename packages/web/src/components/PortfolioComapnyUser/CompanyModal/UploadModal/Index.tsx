import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";

import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { UploadOutlined } from "@ant-design/icons";
import "./uploadModal.scss";
import TextArea from "antd/lib/input/TextArea";
import UploadIcon from "../../../shared/icons/uploadIcon";
import { uploadfileInterface } from "./UploadFileInterface";

type UploadModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  companyid: string;
  folderPath: string | undefined;
};

const { Option } = Select;

const children = [];

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export const UploadModal = ({
  visible,
  setVisible,
  companyid,
  folderPath,
}: UploadModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [size, setSize] = React.useState("default");
  const [fileupload, setFileupload] = useState<uploadfileInterface>();

  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const submit = () => {
    form.validateFields().then(() => {
      const formData: any = new FormData();
      formData.append("name", fileupload?.formfile.name);
      formData.append("description", fileupload?.description);
      formData.append("folderpath", folderPath);
      formData.append("formfile", fileupload?.formfile);

      service
        .createFolder(formData, companyid)
        .then(() => setLoadingSpinner(true))
        .then(() => message.success("File created successfully"))
        .then(() => {
          window.location.reload();
        });
    });
  };

  const onValuesChange = (changedValues, values) => {
    const fileData: File = values.file.fileList[0].originFileObj;

    const onValuesPostData = {
      name: "testDefalut",
      description: values.description || "",
      folderPath: folderPath,
      formfile: fileData,
    };

    setFileupload(onValuesPostData);
  };

  const props = {
    beforeUpload: (file) => {
      return false;
    },
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title={
          <div style={{ display: "flex" }}>
            <span className="Icon">
              <UploadIcon />
            </span>
            Upload File to Change of Auditor
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
            onClick={submit}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Save" : "Please Wait"}
          </Button>,
        ]}
        className="newstyle4 upload "
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          className="uploadPart"
          onValuesChange={onValuesChange}
        >
          <div className="icon">
            <Form.Item name="file">
              <Upload {...props}>
                <Button>
                  Upload New File <UploadOutlined />
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="icon">
            <p className="icon2">
              This file will be accessible by everyone in the Document Center
            </p>
          </div>

          <div className="icon">
            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
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
              name=""
              label="Assign to Individual"
              className="InputText"
            >
              <Input placeholder="Serach for group" />
            </Form.Item>
          </div>

          <div>
            <Form.Item name="" label="Selected Users" className="InputText">
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
