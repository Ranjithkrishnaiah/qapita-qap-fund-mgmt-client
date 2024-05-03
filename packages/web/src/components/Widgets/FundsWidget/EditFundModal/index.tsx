import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import "./EditFundModal.scss";
import { editFundInterface } from "./EditModalInterface";
import { useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import axios from "axios";
import { TokenContext } from "../../../../Context/TokenContext/TokenContextProvider";
import myData from "../../country.json";
import currencyData from "../../currency.json";

type EditFundModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  fundid: string;
};

export const EditFundModal = ({
  visible,
  setVisible,
  fundid,
}: EditFundModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const { getClient, slugId } = useContext(ApplicationContext);
  const [form] = Form.useForm();
  const [test, setTest] = useState<editFundInterface>();
  const service = getClient().getFundService();

  useEffect(() => {
    if (fundid != "") {
      service.getFund(fundid).then((response: any) => {
        setTest(response);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTest, slugId, fundid, getClient]);

  const UpdateFundInfo = () => {
    form.validateFields().then(() => {
      const postData = {
        name: {
          brandName: test?.name.brandName,
          legalName: test?.name.legalName,
        },
        incorporationDetails: {
          country: test?.incorporationDetails.country,
          corporateNumber: test?.incorporationDetails.corporateNumber,
          address: test?.incorporationDetails.address,
        },
        fundSize: {
          currency: test?.reportingCurrency,
          amount: test?.fundSize.amount,
        },
        reportingCurrency: test?.reportingCurrency,
        websiteUrl: test?.websiteUrl,
        managementFee: {
          currency: test?.managementFee.currency,
          amount: test?.managementFee.amount,
        },
        contactPerson: "contact",
        email: "www.test.com",
        phoneNumber: 25478781255,
        carry: test?.carry,
        additionalMemo: test?.additionalMemo,
        hurdleTask: test?.hurdleTask,
      };
      // form.resetFields();
      service.updateFund(postData, fundid);

      setLoadingSpinner(true);
      message.success("Data Edit is successfully");
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
        currency: values.reportingCurrency,
        amount: values.amount,
      },
      reportingCurrency: values.reportingCurrency,
      websiteUrl: values.websiteUrl,
      managementFee: {
        currency: values.reportingCurrency,
        amount: values.fundManagementFee,
      },
      contactPerson: "contact",
      email: "www.test.com",
      phoneNumber: 25478781255,
      carry: values.carry,
      additionalMemo: values.additionalMemo,
      hurdleTask: values.hurdleTask,
    };
    setTest(onValuesPostData);
  };

  useEffect(() => {
    form.setFieldsValue({
      brandName: test?.name.brandName,
      legalName: test?.name.legalName,
      corporateNumber: test?.incorporationDetails.corporateNumber,
      websiteUrl: test?.websiteUrl,
      address: test?.incorporationDetails.address,
      country: test?.incorporationDetails.country,
      amount: test?.fundSize.amount,
      reportingCurrency: test?.reportingCurrency,
      hurdleTask: test?.hurdleTask,
      carry: test?.carry,
      additionalMemo: test?.additionalMemo,
      fundManagementFee: test?.managementFee.amount,
    });
  }, [form, test]);

  const { Option } = Select;

  return (
    <>
      <Modal
        forceRender
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
            onClick={UpdateFundInfo}
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
              initialValue={test?.name.brandName}
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
            >
              <Input
                name="corporateNumber"
                placeholder="1533049489"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Website Address */}
            <Form.Item name="websiteUrl" label="Website Address">
              <Input
                name="websiteUrl"
                placeholder="www.website.com"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Address */}
            <Form.Item name="address" label="Address">
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

            {/* Country */}
            <Form.Item name="amount" label="Fund Size">
              <Input
                name="amount"
                placeholder="1,000,000"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* Currency */}
            <Form.Item name="reportingCurrency" label="Reporting Currency">
              <Select
                // className="firmProfileInputField"
                bordered={true}
                placeholder="Country"
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
            <Form.Item name="hurdleTask" label="Hurdle Rate">
              <Input
                name="hurdleTask"
                placeholder="30%"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* carry */}
            <Form.Item name="carry" label="Carry">
              <Input
                name="carry"
                placeholder="20%"
                bordered={false}
                className="firmProfileInputField"
              />
            </Form.Item>

            {/* memo */}
            <Form.Item name="additionalMemo" label="Additional memo">
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
