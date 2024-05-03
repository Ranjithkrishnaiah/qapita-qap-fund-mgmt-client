import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import "./linkStakeholderModal.scss";
import { useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { LinkOutlined } from "@ant-design/icons";
import { editFundInterface } from "../EditFundModal/EditModalInterface";
import { ProtCoObject } from "../../../PortCoAssociation/PortCoTableBody/ProtCoObject";
import { QmapStakeholdersObject } from "./qmapStakeholdersObject";

type LinkStakeholderModalProps = {
  visibleLinkStakeholder: boolean;
  setVisibleLinkStakeholder: (a: boolean) => void;
  fundid: string;
};

export const LinkStakeholderModal = ({
  visibleLinkStakeholder,
  setVisibleLinkStakeholder,
  fundid,
}: LinkStakeholderModalProps): ReactElement => {
  const onCancel = () => {
    form.resetFields();
    setVisibleLinkStakeholder(false);
  };

  const [portCoCompanies, setPortCoCompanies] = useState<ProtCoObject[]>([]);
  const [qmapStakeholders, setQmapStakeholders] = useState<
    QmapStakeholdersObject | any
  >();
  const [selectedCompanyIssuerId, setSelectedCompanyIssuerId] = useState(0);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedstakeholderId, setSelectedstakeholderId] = useState(0);
  const [recordBtnState, setRecordBtnState] = useState(true);

  const { getClient, slugId } = useContext(ApplicationContext);
  const [form] = Form.useForm();
  const [test, setTest] = useState<editFundInterface>();
  const service = getClient().getFundService();
  const servicePortCoCompanies = getClient().getSidebarService();
  const serviceStakeholders = getClient().getStakeholdersService();

  useEffect(() => {
    if (fundid != "") {
      service.getFund(fundid).then((response: any) => {
        setTest(response);
      });
    }

    servicePortCoCompanies
      .getSidebarCompanies()
      .then((res: any) => setPortCoCompanies(res));

    // serviceStakeholders
    //   .getQmapCompanyStakeholders(selectedCompanyIssuerId)
    //   .then((res: any) => setQmapStakeholders(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTest, slugId, fundid, getClient]);

  function companySelecthandler(value) {
    const selCompanyIssuerId = value;
    setSelectedCompanyIssuerId(value);
    const selCompanyId = portCoCompanies.filter(
      (data) => data.qMapIssuerId === value
    )[0].id;
    setSelectedCompanyId(selCompanyId);

    serviceStakeholders
      .getQmapCompanyStakeholders(value)
      .then((res: any) => setQmapStakeholders(res));
  }

  function stakeholderSelecthandler(value) {
    const selstakeholderId = qmapStakeholders?.stakeholders.filter(
      (data) => data.name === value
    )[0].stakeholderId;
    setSelectedstakeholderId(selstakeholderId);
  }

  const CreateLinkHandler = () => {
    form.validateFields().then(() => {
      const postData = {
        qMapStakeholderId: selectedstakeholderId,
      };
      serviceStakeholders
        .postQmapCompanyStakeholder(fundid, selectedCompanyId, postData)
        .then((res: any) => {
          if (res.status === 200 || 204) {
            message.success("Stakeholder is successfully linked to the fund");
            setRecordBtnState(false);
          }
        })
        .then((res) => setVisibleLinkStakeholder(false))
        .then((res) => form.resetFields());
    });
  };

  const RecordInvestmentsHandler = () => {
    // setTest(onValuesPostData);
  };

  return (
    <>
      <Modal
        visible={visibleLinkStakeholder}
        onCancel={onCancel}
        centered
        title={
          <div className="linkPortCoModalTitle">
            <LinkOutlined /> Link Stakeholder
          </div>
        }
        footer={[
          <Button
            key="submit"
            // className="firmProfileCancelBtn"
            className="sendInviteBtn firmProfileUpdateBtn"
            onClick={CreateLinkHandler}
            // disabled={!recordBtnState}
          >
            Create Link
          </Button>,
          // <Button
          //   key="submit"
          //   className="sendInviteBtn firmProfileUpdateBtn"
          //   onClick={RecordInvestmentsHandler}
          //   disabled={recordBtnState}
          // >
          //   Record Investment(s)
          // </Button>,
        ]}
        className="newStyle popupModalClass linkStakeholderModal"
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm fundAddForm linkStakeholderForm"
        >
          <h4 className="fundName_headline">{test?.name.brandName}</h4>

          <div className="firmProfileForm__block linkStakeholderForm__block">
            {/* Company Name */}
            <Form.Item
              name="company"
              label="Company"
              rules={[
                {
                  required: true,
                  message: "Please select the Company",
                },
              ]}
            >
              <Select
                placeholder="Select Company"
                bordered={false}
                className="firmProfileInputField"
                onChange={companySelecthandler}
              >
                {portCoCompanies.map((el, index) => (
                  <Select.Option
                    name={el.legalName}
                    value={el.qMapIssuerId}
                    key={index}
                  >
                    {el.legalName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Stakeholder Name */}
            <Form.Item
              name="stakeholder"
              label="Stakeholder"
              rules={[
                {
                  required: true,
                  message: "Please select the Stakeholder",
                },
              ]}
            >
              <Select
                placeholder="Select Stakeholder"
                bordered={false}
                className="firmProfileInputField"
                onChange={stakeholderSelecthandler}
              >
                {qmapStakeholders?.stakeholders.map((el, index) => (
                  <Select.Option
                    name={el.stakeholderId}
                    value={el.name}
                    key={index}
                  >
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
