import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Table } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import AcceptedIcon from "../../shared/icons/AcceptedIcon";
import { ProtCoObject } from "../PortCoTableBody/ProtCoObject";
import "./linkPortCoModal.scss";
import { LinkPortCoTableBody } from "./LinkPortCoTableBody";
import { LinkPortCoTableRow } from "./LinkPortCoTableBody/LinkPortCoTableRow";
import { LinkPortCoTableHeader } from "./LinkPortCoTableHeader";
import { LinkPortCoTableSearch } from "./LinkPortCoTableSearch";
import { qmapCompaniesObject } from "./qmapCompaniesObject";

type LinkPortCoModalProps = {
  visibleLinkPortCo: boolean;
  setVisibleLinkPortCo: (a: boolean) => void;
  portCoData: ProtCoObject[];
  setPortCoData: (a: ProtCoObject[]) => void;
};

export const LinkPortCoModal = ({
  visibleLinkPortCo,
  setVisibleLinkPortCo,
  portCoData,
  setPortCoData,
}: LinkPortCoModalProps): ReactElement => {
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().PortcoAssociationService();
  const servicePortCo = getClient().getSidebarService();

  type qmapCompaniesPost = {
    legalName: string;
  };

  const [checkedIssuerID, setcheckedIssuerID] = useState(0);
  const [qmapCompanies, setQmapCompanies] = useState<qmapCompaniesObject[]>();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [qmapCompaniesPost, setQmapCompaniesPost] =
    useState<qmapCompaniesPost>();
  const [checkAll, setCheckAll] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const columns = [
    {
      title: "Company",
      dataIndex: "issuerName",
      key: "Company",
    },
    {
      title: "Managed By",
      dataIndex: "isSelfManaged",
      key: "ManagedBy",
      render: (isSelfManaged) =>
        isSelfManaged ? "Company Managed" : "Fund Managed",
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.isSelfManaged === true || record.isLinked === true,
    }),
  };

  const onCancel = () => {
    setVisibleLinkPortCo(false);
    setSelectedRowKeys([]);
  };

  const submitLinkPortCo = () => {
    const postData = qmapCompanies?.filter((el) => {
      const data = el.issuerId;
      return selectedRowKeys.includes(data);
    });
    const data: any[] = [];
    const idData: any[] = [];
    postData?.map((el) => {
      data.push({
        legalName: el.issuerName,
      });
    });

    postData?.map((el) => {
      idData.push({
        legalName: el.issuerName,
        issuerId: el.issuerId,
      });
    });

    const putData: any[] = [];

    service
      .postPortCoCompaniesValues(data)

      .then((res: any) => {
        setQmapCompaniesPost(res);

        if (res.status === 200 || 204) {
          putData.push(res.data);

          const data: any = [];
          putData.forEach((element) => {
            data.push(element);
          });
          const a: any = [];
          putData.forEach((ele) => {
            ele.forEach((item) => {
              idData.forEach((el) => {
                if (item.legalName === el.legalName) {
                  a.push({
                    issuerId: el.issuerId,
                    companyId: item.id,
                  });
                }
              });
            });
          });

          service
            .putPortCoCompanyIssuerId(a)

            .then((res: any) => {
              if (res.status === 200 || 204) {
                servicePortCo
                  .getSidebarCompanies()
                  .then((res: any) => setPortCoData(res));

                message.success("New PortCo Linked successfully");
              }
            })
            .then((res: any) => {
              service
                .getPortCoQmapCompanies()
                .then((res: any) => setQmapCompanies(res));
            });
        }
      })
      .then(() => setVisibleLinkPortCo(false))
      .then(() => setSelectedRowKeys([]));
  };

  useEffect(() => {
    service.getPortCoQmapCompanies().then((res: any) => setQmapCompanies(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  // let isdisabledCondition;

  useEffect(() => {
    const isdisabledCondition = qmapCompanies?.every(
      (el) => el.isSelfManaged || el.isLinked
    );
    if (isdisabledCondition) {
      setSubmitDisabled(isdisabledCondition);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qmapCompanies]);

  return (
    <>
      <Modal
        visible={visibleLinkPortCo}
        onCancel={onCancel}
        centered
        title={
          <div className="linkPortCoModalTitle">
            <LinkOutlined /> Link New PortCo
          </div>
        }
        footer={[
          <Button
            key="cancel"
            className="firmProfileCancelBtn"
            onClick={onCancel}
          >
            Close
          </Button>,
          <Button
            key="submit"
            className="sendInviteBtn firmProfileUpdateBtn"
            onClick={submitLinkPortCo}
            disabled={submitDisabled}
          >
            Submit
          </Button>,
        ]}
        className="newStyle popupModalClass linkPortCoModal"
        width={800}
      >
        <div className="linkPortCoModal_TableWrapper">
          {/* <LinkPortCoTableSearch /> */}

          {/* <LinkPortCoTableHeader
            checkAll={checkAll}
            setCheckAll={setCheckAll}
          />

          <LinkPortCoTableBody
            checkAll={checkAll}
            setCheckAll={setCheckAll}
            checkedIssuerID={checkedIssuerID}
            setcheckedIssuerID={setcheckedIssuerID}
          /> */}

          <div className="linkPortCoModal_noteText">
            <p>
              <b>Notes</b>
            </p>
            <ul>
              <li>
                Please reach out to our customer success team, if you cannot
                find your Portfolio Company.
              </li>

              {submitDisabled === true ? (
                <li>
                  Checkbox against a company is disabled, whenever it is already
                  linked or it is company managed.
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <Table
            className="linkPortCoTable"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={qmapCompanies}
            rowKey={(record) => record.issuerId}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  );
};
