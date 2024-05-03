import { Table, Tag } from "antd";
import React from "react";
import "./otherStakeHoldingTable.scss";

type OtherStakeHoldingTableProps = {
  data: any;
};

export const OtherStakeHoldingTable = ({
  data,
}: OtherStakeHoldingTableProps) => {
  const otherStakeHoldingColumns: any = [
    {
      title: "Stakeholders",
      dataIndex: "stakeholder",
      key: "stakeholder",
      // align: "left",
    },
    {
      title: "Security Classes",
      dataIndex: "securityClasses",
      key: "securityClasses",
      // align: "left",
      render: (securityClasses) => {
        if (securityClasses) {
          let color;
          securityClasses?.startsWith("E")
            ? (color = "#658DE5")
            : securityClasses.startsWith("S")
            ? (color = "#A8EE90")
            : (color = "steelblue");
          return <Tag color={color}>{securityClasses?.toUpperCase()}</Tag>;
        }
      },
    },
    {
      title: "Fully Diluted",
      dataIndex: "fullyDiluted",
      key: "fullyDiluted",
      // align: "right",
    },
    {
      title: "Primary Amt",
      dataIndex: "primaryAmt",
      key: "primaryAmt",
      // align: "right",
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      // align: "right",
    },
  ];

  const otherStakeholdersHoldingsFooterData = [
    {
      key: 1,
      subTotal: "Subtotal",
      fullyDilutedShares: 10000,
      primaryAmountInvested: "USD 673,325",
      ownershipPercentage: "10.3%",
    },
  ];

  const otherStakeHoldinFooterColumns: any = [
    {
      title: "Subtotal",
      dataIndex: "subTotal",
      key: "subTotal",
      // width: 225,
      render: () => {
        return <span className="subtotalText">Subtotal</span>;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "securityClassesFooter",
      // align: "left",
      className: "emptyFooterCol",
      render: () => <span></span>,
    },
    {
      title: "Fully Diluted",
      dataIndex: "fullyDilutedShares",
      key: "fullyDilutedShares",
      // align: "right",
    },
    {
      title: "Primary Amt",
      dataIndex: "primaryAmountInvested",
      key: "primaryAmountInvested",
      // align: "right",
    },
    {
      title: "Ownership",
      dataIndex: "ownershipPercentage",
      key: "ownershipPercentage",
      // align: "right",
    },
  ];

  const otherStakeholdersHoldingsFooter = () => {
    return (
      <Table
        showHeader={false}
        columns={otherStakeHoldinFooterColumns}
        dataSource={otherStakeholdersHoldingsFooterData}
        pagination={false}
        rowClassName={() => "otherStakeholderHoldingsFooterRow"}
        className="tableFooter"
      />
    );
  };

  return (
    <Table
      columns={otherStakeHoldingColumns}
      dataSource={data}
      showHeader={false}
      pagination={false}
      footer={otherStakeholdersHoldingsFooter}
      className="otherStakeholdingTable"
    />
  );
};
