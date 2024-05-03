import React from "react";
import { Select } from "antd";
import "./transactionSelect.scss";
const { Option, OptGroup } = Select;

type TransactionSelectBtnProps = {
  setColumnType: (a: string) => void;
};

export const TransactionSelectBtn = ({
  setColumnType,
}: TransactionSelectBtnProps) => {
  function handleChange(value) {
    setColumnType(value);
  }

  return (
    <div className="transSelectBtnCont">
      <Select
        className="transSelect"
        defaultValue="shareIssuance"
        onChange={handleChange}
      >
        <>
          <OptGroup label="Primary">
            <Option value="shareIssuance">Share Issuances</Option>
            <Option value="convertibleIssuance">Convertible Issuances</Option>
            <Option value="warrantIssuances">Warrant Issuances</Option>
            <Option value="shareBuyback">Share Buyback</Option>
          </OptGroup>
          <OptGroup label="Secondary">
            <Option value="shareTransfers">Share Transfers</Option>
          </OptGroup>
        </>
      </Select>
    </div>
  );
};
