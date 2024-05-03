import { Button, Divider, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { ReactElement } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import "./FirmProfileFormModal.scss";
import { Upload, message } from "antd";
import GoogleDriveIcon from "../../shared/icons/GoogleDriveIcon";
import { firmProfileInterface } from "../firmProfileInterface";
import { FolderAddOutlined } from "@ant-design/icons";
import { TokenContext } from "../../../Context/TokenContext/TokenContextProvider";
import myData from "../../../components/Widgets/country.json";
import currencyData from "../../../components/Widgets/currency.json";

const { Dragger } = Upload;

type FirmProfileFormModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  // firm: firmProfileInterface | undefined;
  // setFirm: (a: firmProfileInterface | undefined) => void;
  // logo: string | undefined;
  // setLogo: (a: any) => void;
};

export const FirmProfileFormModal = ({
  visible,
  setVisible,
}: // firm,
// setFirm,
// logo,
// setLogo,
FirmProfileFormModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [form] = Form.useForm();
  const [logo, setLogo] = useState();
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [fileList, setFileList] = useState([]);

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const { token } = useContext(TokenContext);
  const service = getClient().getFirmProfileService();

  useEffect(() => {
    service.getFirmProfile().then((res: any) => setFirm(res));

    service.getFirmLogo().then((res: any) => setLogo(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFirm, slugId, setLogo, getClient]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
    setLogo(fileList[0].thumbUrl);
  };

  const updateFirmInfo = () => {
    form.validateFields().then(() => {
      const postData = {
        organizationName: {
          brandName: firm?.organizationName.brandName,
          legalName: firm?.organizationName.legalName,
        },
        incorporationDetails: {
          country: firm?.incorporationDetails.country,
          corporateNumber: firm?.incorporationDetails.corporateNumber,
          address: firm?.incorporationDetails.address,
        },
        contactPerson: firm?.contactPerson,
        contactNumber: firm?.contactNumber,
        emailId: firm?.emailId,
        websiteUrl: firm?.websiteUrl,
        reportingCurrency: firm?.reportingCurrency,
      };
      form.resetFields();

      service
        .putFirmProfile(postData)
        // .then((res) => {
        //   if (res.status === 200 || 204) {
        //     console.log("res.status", res.status);
        //     service.getFirmProfile().then((res: any) => setFirm(res));
        //     message.success("Firm info updated successfully");
        //   }
        // })
        // .then(() => setVisible(false));

        .then(message.success("Firm info updated successfully"))
        .then(() => setLoadingSpinner(true));

      setTimeout(function () {
        window.location.reload();
      }, 500);
    });
  };

  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      organizationName: {
        brandName: values.brandName,
        legalName: values.legalName,
      },
      incorporationDetails: {
        country: values.country,
        corporateNumber: values.CIN,
        address: values.address,
      },
      contactPerson: values.contactPerson,
      contactNumber: values.contactNumber,
      emailId: values.email,
      websiteUrl: values.companyWebsite,
      reportingCurrency: values.reportingCurrency,
    };
    setFirm(onValuesPostData);
  };

  const dragProps = {
    name: "logoFile",
    multiple: false,
    maxCount: 1,
    action: `https://qfunddev.qapitacorp.com/${slugId}/api/v1/logo`,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    defaultFileList: [...fileList],
    onChange(info) {
      const { status } = info.file;
      console.log("status", status);
      if (status !== "uploading") {
        console.log("info file", info.file, "info filelist", info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const normFile = (e: any) => {
    service.getFirmLogo().then((res: any) => setLogo(res));
  };

  const { Option } = Select;

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title="Firm Info"
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
            onClick={updateFirmInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Update" : "Please Wait"}
          </Button>,
        ]}
        className="newStyle popupModalClass"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm"
          onValuesChange={onValuesChange}
        >
          <h4 className="firmProfileForm__headline">Basic info</h4>

          <div className="firmProfileForm__block">
            <Form.Item
              name="logo"
              label="Company Logo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Dragger {...dragProps} listType="picture" fileList={fileList}>
                <div className="uploadLocalImg">
                  <p className="ant-upload-hint">Drag & Drop</p>
                  <span className="ant-upload-hint">CHOOSE FILE</span>
                </div>
                <Divider type="vertical" />
                <div className="uploadDriveImg">
                  <FolderAddOutlined />
                </div>
              </Dragger>
            </Form.Item>
          </div>

          <div className="firmProfileForm__block">
            {/* Legal Name */}
            <Form.Item
              name="legalName"
              label="Legal Name"
              initialValue={firm?.organizationName.legalName}
              rules={[
                {
                  required: true,
                  message: "Please input the legal name",
                },
              ]}
            >
              <Input
                name="legalName"
                placeholder="Legal Name"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* CIN / Corporate # */}
            <Form.Item
              name="CIN"
              label="CIN / Corporate #"
              initialValue={firm?.incorporationDetails.corporateNumber}
              rules={[
                {
                  required: true,
                  message: "Please input the CIN / Corporate #",
                },
              ]}
            >
              <Input
                name="CIN"
                placeholder="CIN / Corporate #"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Brand Name */}
            <Form.Item
              name="brandName"
              label="Brand Name"
              initialValue={firm?.organizationName.brandName}
              rules={[
                {
                  required: true,
                  message: "Please input the brand name",
                },
              ]}
            >
              <Input
                name="brandName"
                placeholder="Brand Name"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Country */}
            <Form.Item
              name="country"
              label="Country"
              initialValue={firm?.incorporationDetails.country}
              rules={[
                {
                  required: true,
                  message: "Please input the country",
                },
              ]}
            >
              <Select
                // className="firmProfileInputField"
                bordered={true}
                placeholder="Country"
                size="large"
              >
                {myData.map((ele) => (
                  <Option key={ele.id} value={ele.name}>
                    {ele.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Currency */}
            <Form.Item
              name="reportingCurrency"
              label="Currency"
              initialValue={firm?.reportingCurrency}
              rules={[
                {
                  required: true,
                  message: "Please input the reporting currency",
                },
              ]}
            >
              <Select
                // className="firmProfileInputField"
                bordered={true}
                placeholder="Currency"
                size="large"
              >
                {currencyData.map((item) => (
                  <Option key={item.id} value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Company Website */}
            <Form.Item
              name="companyWebsite"
              label="Company Website"
              initialValue={firm?.websiteUrl}
            >
              <Input
                name="companyWebsite"
                placeholder="Company Website"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>
          </div>

          <h4 className="firmProfileForm__headline">Contact info</h4>

          <div className="firmProfileForm__block">
            {/* Name */}
            <Form.Item
              name="contactPerson"
              label="Name"
              initialValue={firm?.contactPerson}
            >
              <Input
                name="contactPerson"
                placeholder="Name"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Phone # */}
            <Form.Item
              name="contactNumber"
              label="Phone #"
              initialValue={firm?.contactNumber}
            >
              <Input
                name="contactNumber"
                type="number"
                placeholder="Phone #"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

                  message: "The input is not valid E-mail!",
                },
              ]}
              initialValue={firm?.emailId}
            >
              <Input
                name="email"
                placeholder="Email"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Address */}
            <Form.Item
              name="address"
              label="Address"
              initialValue={firm?.incorporationDetails.address}
            >
              <Input
                name="address"
                placeholder="Address"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
