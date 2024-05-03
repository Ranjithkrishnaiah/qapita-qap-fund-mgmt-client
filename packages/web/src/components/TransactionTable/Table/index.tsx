import React from "react";
import { Table, Tag, TagType } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Transaction } from "../../../pages/Transactions";
import "./transactionTable.scss";

type TransactionTable = {
  column: any;
  transactions: Transaction[];
  columnType: string;
};

export const TransactionTable = ({
  column,
  transactions,
  columnType,
}: TransactionTable) => {
  const [tableRow, setTableRow] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  function curateTransaction(transactions, columnType) {
    const data: any[] = [];

    switch (columnType) {
      case "shareIssuance":
        transactions?.map((el) => {
          const payload = {
            key: el.id,
            certificateCode: el.certificateCode,
            tags: el.tags,
            fund: el.stakeholder,
            shareClassCode: el.shareClassCode,
            units: el.units,
            issuePricePerShare: el.issuePricePerShare,
            issueDate: el.issueDate,
          };
          data.push(payload);
        });
        break;
      case "convertibleIssuance":
        transactions?.map((el) => {
          const payload = {
            key: el.id,
            stakeholder: el.stakeholder,
            tags: el.tags,
            convertibleClassCode: el.convertibleClassCode,
            amountInvested: el.amountInvested,
            issueDate: el.issueDate,
            maturityDate: el.maturityDate,
          };
          data.push(payload);
        });
        break;
      case "warrantIssuances":
        transactions?.map((el) => {
          const payload = {
            key: el.id,
            tags: el.tags,
            stakeholder: el.stakeholder,
            warrantClassCode: el.warrantClassCode,
            warrantUnits: el.warrantUnits,
            purchasePricePerUnit: el.purchasePricePerUnit,
            dateOfIssuance: el.dateOfIssuance,
          };
          data.push(payload);
        });
        break;
      case "shareBuyback":
        transactions?.map((el) => {
          const payload = {
            key: el.id,
            tags: el.tags,
            stakeholder: el.stakeholder,
            shareClassCode: el.shareClassCode,
            units: el.units,
            pricePerShare: el.pricePerShare,
            buyBackDate: el.buyBackDate,
          };
          data.push(payload);
        });
        break;
      case "shareTransfers":
        transactions?.map((el) => {
          const payload = {
            key: el.id,
            certificateCode: el.certificateCode,
            tags: el.tags,
            buyer: el.buyer,
            seller: el.seller,
            shareClassCode: el.shareClassCode,
            units: el.units,
            pricePerShare: el.pricePerShare,
            transferDate: el.transferDate,
          };
          data.push(payload);
        });
        break;
    }
    setTableRow(data);
  }
  React.useEffect(() => {
    curateTransaction(transactions, columnType);
  }, [column, transactions, columnType]);

  React.useEffect(() => {
    if (tableRow.length === transactions?.length) setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRow, transactions]);

  return (
    <div>
      <Table
        columns={column}
        dataSource={tableRow}
        pagination={false}
        loading={loading}
        className="trasactionsTable"
      />
    </div>
  );
};
