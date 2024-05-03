import { Table } from "antd";
import React from "react";
import "./capTable.scss";
import { OtherStakeHoldingTable } from "../OtherStakeholdingTable";

const emptyRender = () => {
  return {
    children: <></>,
    props: {
      colSpan: 0,
    },
  };
};

export const CapTable = () => {
  const mainColumns: any = [
    {
      title: "Stakeholders",
      dataIndex: "subHeading",
      key: "subHeading",
      className: "subHeadingRow",
      render: (subHeading) => {
        return {
          children: subHeading,
          props: {
            colSpan: mainColumns.length,
          },
        };
      },
      // align: "left",
    },
    {
      title: "Security Classes",
      dataIndex: "securityClasses",
      key: "securityClasses",
      render: emptyRender,
      // align: "left",
    },
    {
      title: "Fully Diluted",
      dataIndex: "fullyDiluted",
      key: "fullyDiluted",
      // align: "right",
      render: emptyRender,
    },
    {
      title: "Primary Amt",
      dataIndex: "primaryAmt",
      key: "primaryAmt",
      // align: "right",
      render: emptyRender,
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      // align: "right",
      render: emptyRender,
    },
  ];

  const data: any = [];

  const shareHoldingData = [
    {
      key: "unique1",
      stakeholder: "Teqouia Fund-1",
      securityClasses: "CS",
      fullyDiluted: 10000,
      primaryAmt: "USD 673,325",
      ownership: "10.3%",
    },
  ];

  //for subheading.
  if (shareHoldingData.length) {
    data.push({
      key: "1",
      subHeading: "Your Share Holdings",
      type: "shareHolding",
      particularData: shareHoldingData,
    });
  }

  //function for returning particular table according to record.type
  const onExpandRowRender = (record: any) => {
    switch (record.type) {
      case "shareHolding":
        return <OtherStakeHoldingTable data={record?.particularData} />;
    }
  };

  return (
    <div>
      <Table
        columns={mainColumns}
        dataSource={data}
        pagination={false}
        defaultExpandAllRows
        expandIconColumnIndex={-1}
        expandedRowRender={onExpandRowRender}
        rowClassName={(record) => "subHeadingRow"}
        className="captable"
      />
    </div>
  );
};
