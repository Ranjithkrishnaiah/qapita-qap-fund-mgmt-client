import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { ReactElement, useContext, useEffect } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { firmProfileInterface } from "../../../FirmProfileInfo/firmProfileInterface";
import "./AddFundModal.scss";
import { addFundInterface } from "./AddFundModalInterface";
import myData from "../../country.json";
import currencyData from "../../currency.json";

type AddFundModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  fund: addFundInterface | undefined;
  setFund: (a: addFundInterface | undefined) => void;
};

export const AddFundModal = ({
  visible,
  setVisible,
  fund,
  setFund,
}: AddFundModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [form] = Form.useForm();

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getFundService();

  const addFundInfo = () => {
    form.validateFields().then(() => {
      const postData = {
        name: {
          brandName: fund?.name.brandName,
          legalName: fund?.name.legalName,
        },
        incorporationDetails: {
          country: fund?.incorporationDetails.country,
          corporateNumber: fund?.incorporationDetails.corporateNumber,
          address: fund?.incorporationDetails.address,
        },
        fundSize: {
          currency: fund?.reportingCurrency,
          amount: fund?.fundSize.amount,
        },
        reportingCurrency: fund?.reportingCurrency,
        websiteUrl: fund?.websiteUrl,
        managementFee: {
          currency: fund?.managementFee.currency,
          amount: fund?.managementFee.amount,
        },
        contactPerson: fund?.contactPerson,
        email: fund?.email,
        phoneNumber: fund?.phoneNumber,
        carry: fund?.carry,
        additionalMemo: fund?.additionalMemo,
        hurdleTask: fund?.hurdleTask,
      };
      form.resetFields();
      service.addFund(postData);

      setLoadingSpinner(true);
      message.success("New fund is created successfully");
      setTimeout(function () {
        window.location.reload();
      }, 500);
    });
  };

  const onValuesChange = (changedValues, values) => {
    const onValuesPostData = {
      name: {
        brandName: values.brandName,
        legalName: values.legalName,
      },
      incorporationDetails: {
        country: values.country,
        corporateNumber: values.corporateNumber,
        address: values.address,
      },
      fundSize: {
        currency: "INR",
        amount: values.amount,
      },
      reportingCurrency: values.reportingCurrency,
      websiteUrl: values.websiteUrl,
      managementFee: {
        currency: values.reportingCurrency,
        amount: values.fundManagementFee,
      },
      contactPerson: values.fundBrandName,
      email: values.fundBrandName,
      phoneNumber: values.fundBrandName,
      carry: values.carry,
      additionalMemo: values.additionalMemo,
      hurdleTask: values.hurdleTask,
    };
    setFund(onValuesPostData);
  };

  const { Option } = Select;

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title="Fund Info"
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
            onClick={addFundInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Save" : "Please Wait"}
          </Button>,
        ]}
        className="newStyle popupModalClass"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm fundAddForm"
          onValuesChange={onValuesChange}
        >
          <h4 className="firmProfileForm__headline">Fund</h4>
          <div className="firmProfileForm__block">
            {/* Fund Brand Name */}
            <Form.Item
              name="brandName"
              label="Fund Brand Name"
              rules={[
                {
                  required: true,
                  message: "Please input the Brand Name",
                },
              ]}
              initialValue={fund?.name.brandName}
            >
              <Input
                name="brandName"
                placeholder="Tequoia Fund Pte. Ltd."
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            <Form.Item
              name="legalName"
              label="Fund Legal Name"
              rules={[
                {
                  required: true,
                  message: "Please input the Legal Name",
                },
              ]}
              initialValue={fund?.name.legalName}
            >
              <Input
                name="legalName"
                placeholder="Tequoia Fund Pte. Ltd."
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* CIN / Corporate # */}
            <Form.Item
              name="corporateNumber"
              label="CIN / Corporate #"
              rules={[
                {
                  required: true,
                  message: "Please input the Corporate Number",
                },
              ]}
              initialValue={fund?.incorporationDetails.corporateNumber}
            >
              <Input
                name="corporateNumber"
                placeholder="1533049489"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Website Address */}
            <Form.Item
              name="websiteUrl"
              label="Website Address"
              initialValue={fund?.websiteUrl}
            >
              <Input
                name="websiteUrl"
                placeholder="www.website.com"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Address */}
            <Form.Item
              name="address"
              label="Address"
              initialValue={fund?.incorporationDetails.address}
            >
              <Input
                name="address"
                placeholder="Road No 6,Crunch Street"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>
          </div>

          <h4 className="firmProfileForm__headline">Fund Settings</h4>

          <div className="firmProfileForm__block">
            {/* Country */}
            <Form.Item
              name="country"
              label="Country"
              rules={[
                {
                  required: true,
                  message: "Please input the Country",
                },
              ]}
              initialValue={fund?.incorporationDetails.country}
            >
              <Select
                className="CountryFiled"
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

            {/* Country */}
            <Form.Item
              name="amount"
              label="Fund Size"
              initialValue={fund?.fundSize.amount}
            >
              <Input
                name="amount"
                placeholder="1,000,000"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Currency */}
            <Form.Item
              name="reportingCurrency"
              label="Reporting Currency"
              initialValue={fund?.reportingCurrency}
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
          </div>

          <h4 className="firmProfileForm__headline">Other Info</h4>
          <div className="firmProfileForm__block">
            {/* rate */}
            <Form.Item
              name="hurdleTask"
              label="Hurdle Rate"
              initialValue={fund?.hurdleTask}
            >
              <Input
                name="hurdleTask"
                placeholder="30%"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* carry */}
            <Form.Item name="carry" label="Carry" initialValue={fund?.carry}>
              <Input
                name="carry"
                placeholder="20%"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* memo */}
            <Form.Item
              name="additionalMemo"
              label="Additional memo"
              initialValue={fund?.additionalMemo}
            >
              <Input
                name="additionalMemo"
                placeholder="Info message"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            <Form.Item
              name="fundManagementFee"
              label="Fund Managers Management fee"
              initialValue={fund?.managementFee.amount}
            >
              <Input
                name="fundManagementFee"
                placeholder="2%"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>
          </div>

          {/* <h4 className="firmProfileForm__headline">
            ASSOCIATE PORTFOLIO COMPANY
          </h4>
          <div className="firmProfileForm__block">
            <Form.Item
              name="holder"
              label="Assoicate Stakeholder"
              initialValue="Tequoia Fund"
            >
              <Input
                name="holder"
                placeholder="Tequoia Fund"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            <Form.Item
              name="portfolioCompany"
              label="Portfolio Company"
              initialValue="Tamato"
            >
              <Select
                placeholder="CooKBooK"
                bordered={false}
                className="firmProfileInputField"
              >
                <Select.Option name="usa" value="Tamato">
                  Tamato
                </Select.Option>
                <Select.Option name="inr" value="Giggy">
                  Giggy
                </Select.Option>
              </Select>
            </Form.Item>
          </div>

          <h4 className="firmProfileForm__headline">PORTFOLIO COMPAIES </h4> */}
        </Form>
      </Modal>
    </>
  );
};
