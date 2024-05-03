import React, { useContext, useState } from "react";
import { Layout, Statistic, Tag } from "antd";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { TransactionTable } from "../../components/TransactionTable/Table";
import { TransactionsBtnCollection } from "../../components/TransactionTable/ButtonCollection";
import { MoreOutlined } from "@ant-design/icons";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { useParams } from "react-router";
import { Models } from "@qapita/fund-admin-client/src/contracts";
import { PortFolioTopbar } from "../../components/common/PortoFolioTopbar";
const { Content } = Layout;

type CompanyIdParam = {
  companyId: string;
};

function formatDate(dateString) {
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatAmount(amountObj) {
  return (
    <Statistic
      value={amountObj?.amount}
      prefix={amountObj?.currency.code}
      precision={2}
      valueStyle={{ fontSize: "14px" }}
    />
  );
}

export type Transaction =
  | Models.ShareIssuance
  | Models.ConvertibleIssuance
  | Models.WarrantIssuance
  | Models.ShareBuyback
  | Models.ShareTransfer
  | undefined;

const shareIssuanceCols = [
  {
    title: "Cert.Code",
    dataIndex: "certificateCode",
    key: "certificateCode",
    render: (certificateCode) =>
      certificateCode !== null ? <p>{certificateCode}</p> : <p>—</p>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.length === 0 ? (
          <p>—</p>
        ) : (
          tags.map((tag, ind) => <p key={ind}>tag</p>)
        )}
      </>
    ),
  },
  {
    title: "Fund",
    dataIndex: "fund",
    key: "fund",
    render: (fund) => (fund !== null ? <p>{fund}</p> : <p>—</p>),
  },
  {
    title: "Share Class",
    dataIndex: "shareClassCode",
    key: "shareClassCode",
    render: (shareClass) => {
      if (shareClass) {
        let color;
        shareClass?.startsWith("E")
          ? (color = "#658DE5")
          : shareClass.startsWith("S")
          ? (color = "#A8EE90")
          : (color = "steelblue");
        return <Tag color={color}>{shareClass?.toUpperCase()}</Tag>;
      }
    },
  },
  {
    title: "Shares",
    dataIndex: "units",
    key: "units",
  },
  {
    title: "Price Per Share",
    dataIndex: "issuePricePerShare",
    key: "issuePricePerShare",
    render: (issuePricePerShare) => formatAmount(issuePricePerShare),
  },
  {
    title: "Issued Date",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (issueDate) => {
      const date = formatDate(issueDate);
      return <p>{date}</p>;
    },
  },
  {
    title: "",
    dataIndex: "moreBtn",
    key: "moreBtn",
    render: () => (
      <div style={{ textAlign: "end", cursor: "pointer" }}>
        <MoreOutlined />
      </div>
    ),
  },
];

const convertibleIssuanceCols = [
  {
    title: "Cert.Code",
    dataIndex: "certificateCode",
    key: "certificateCode",
    render: (certificateCode) =>
      certificateCode !== null ? <p>{certificateCode}</p> : <p>—</p>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.length === 0 ? (
          <p>—</p>
        ) : (
          tags.map((tag, ind) => <p key={ind}>tag</p>)
        )}
      </>
    ),
  },
  {
    title: "stakeholder",
    dataIndex: "stakeholder",
    key: "stakeholder",
    render: (stakeholder) => <p>{stakeholder}</p>,
  },
  {
    title: "Convertible Class",
    dataIndex: "convertibleClassCode",
    key: "convertibleClassCode",
    render: (convertibleClass) => <Tag color="#ED6E79">{convertibleClass}</Tag>,
  },
  {
    title: "Amount Invested",
    dataIndex: "amountInvested",
    key: "amountInvested",
    render: (amountInvested) => formatAmount(amountInvested),
  },
  {
    title: "Issued Date",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (issueDate) => {
      const date = formatDate(issueDate);
      return <p>{date}</p>;
    },
  },
  {
    title: "Maturity Date",
    dataIndex: "maturityDate",
    key: "maturityDate",
    render: (maturityDate) => {
      const date = formatDate(maturityDate);
      return <p>{date}</p>;
    },
  },
  {
    title: "",
    dataIndex: "moreBtn",
    key: "moreBtn",
    render: () => (
      <div style={{ textAlign: "end", cursor: "pointer" }}>
        <MoreOutlined />
      </div>
    ),
  },
];

const warrantIssuancesCols = [
  {
    title: "Cert.Code",
    dataIndex: "certificateCode",
    key: "certificateCode",
    render: (certificateCode) =>
      certificateCode !== null ? <p>{certificateCode}</p> : <p>—</p>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.length === 0 ? (
          <p>—</p>
        ) : (
          tags.map((tag, ind) => <p key={ind}>tag</p>)
        )}
      </>
    ),
  },
  {
    title: "Stakeholder",
    dataIndex: "stakeholder",
    key: "stakeholder",
    render: (stakeholder) => <p>{stakeholder}</p>,
  },
  {
    title: "Warrant Class",
    dataIndex: "warrantClassCode",
    key: "warrantClassCode",
    render: (warrantClassCode) => <Tag color="#71DF96">{warrantClassCode}</Tag>,
  },
  {
    title: "Warrants",
    dataIndex: "warrantUnits",
    key: "warrantUnits",
  },
  {
    title: "Purchase Price Per Share",
    dataIndex: "purchasePricePerUnit",
    key: "purchasePricePerUnit",
    render: (purchasePricePerUnit) => formatAmount(purchasePricePerUnit),
  },
  {
    title: "Issue Date",
    dataIndex: "dateOfIssuance",
    key: "dateOfIssuance",
    render: (dateOfIssuance) => {
      const date = formatDate(dateOfIssuance);
      return <p>{date}</p>;
    },
  },
];

const shareBuybackCols = [
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.length === 0 ? (
          <p>—</p>
        ) : (
          tags.map((tag, ind) => <p key={ind}>tag</p>)
        )}
      </>
    ),
  },
  {
    title: "Stakeholder",
    dataIndex: "stakeholder",
    key: "stakeholder",
    render: (stakeholder) => <p>{stakeholder}</p>,
  },
  {
    title: "Share Class",
    dataIndex: "shareClassCode",
    key: "shareClassCode",
    render: (shareClassCode) => <Tag color="#71DF96">{shareClassCode}</Tag>,
  },
  {
    title: "Share",
    dataIndex: "units",
    key: "units",
  },
  {
    title: "Price Per Share",
    dataIndex: "pricePerShare",
    key: "pricePerShare",
    render: (pricePerShare) => formatAmount(pricePerShare),
  },
  {
    title: "Buyback Date",
    dataIndex: "buyBackDate",
    key: "buyBackDate",
    render: (buyBackDate) => {
      const date = formatDate(buyBackDate);
      return <p>{date}</p>;
    },
  },
];

const shareTransfersCols = [
  {
    title: "Cert.Code",
    dataIndex: "certificateCode",
    key: "certificateCode",
    render: (certificateCode) =>
      certificateCode !== null ? <p>{certificateCode}</p> : <p>—</p>,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.length === 0 ? (
          <p>—</p>
        ) : (
          tags.map((tag, ind) => <p key={ind}>tag</p>)
        )}
      </>
    ),
  },
  {
    title: "Transferred To",
    dataIndex: "buyer",
    key: "buyer",
    render: (buyer) => <p>{buyer}</p>,
  },
  {
    title: "Transferred By",
    dataIndex: "seller",
    key: "seller",
    render: (seller) => <p>{seller}</p>,
  },
  {
    title: "Share Class",
    dataIndex: "shareClassCode",
    key: "shareClassCode",
    render: (shareClass) => {
      if (shareClass) {
        let color;
        shareClass?.startsWith("C")
          ? (color = "#658DE5")
          : shareClass.startsWith("S")
          ? (color = "#A8EE90")
          : (color = "steelblue");
        return <Tag color={color}>{shareClass?.toUpperCase()}</Tag>;
      }
    },
  },
  {
    title: "Shares",
    dataIndex: "units",
    key: "units",
  },
  {
    title: "Price Per Share",
    dataIndex: "pricePerShare",
    key: "pricePerShare",
    render: (pricePerShare) => formatAmount(pricePerShare),
  },
  {
    title: "Transfer Date",
    dataIndex: "transferDate",
    key: "transferDate",
    render: (transferDate) => {
      const date = formatDate(transferDate);
      return <p>{date}</p>;
    },
  },
];

export const Transactions = () => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();

  const [column, setColumn] = useState(shareIssuanceCols);
  const [columnType, setColumnType] = useState<string>("shareIssuance");
  const [companyName, setCompanyName] = useState<companyIdInterface>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().getTransactionService();
  const companyIdUrlParam: CompanyIdParam = useParams();
  const companyId = companyIdUrlParam.companyId;

  //function to change columns
  function changeColumn(columnType: string): void {
    switch (columnType) {
      case "shareIssuance":
        setColumn(shareIssuanceCols);
        break;

      case "convertibleIssuance":
        setColumn(convertibleIssuanceCols);
        break;

      case "warrantIssuances":
        setColumn(warrantIssuancesCols);
        break;

      case "shareBuyback":
        setColumn(shareBuybackCols);
        break;

      case "shareTransfers":
        setColumn(shareTransfersCols);
        break;
    }
  }

  //function to fetch data according to column
  function fetchTransactions(columnType: string): void {
    switch (columnType) {
      case "shareIssuance":
        service.getShareIssuanceTransaction(companyId).then((res) => {
          setTransactions(res);
        });
        break;

      case "convertibleIssuance":
        service
          .getConvertibleIssuanceTransaction(companyId)
          .then((res) => setTransactions(res));
        break;

      case "warrantIssuances":
        service
          .getWarrantIssuanceTransaction(companyId)
          .then((res) => setTransactions(res));
        break;

      case "shareBuyback":
        service
          .getShareBuybackTransaction(companyId)
          .then((res) => setTransactions(res));
        break;

      case "shareTransfers":
        service
          .getShareTransferTransaction(companyId)
          .then((res) => setTransactions(res));
        break;
    }
  }

  React.useEffect(() => {
    changeColumn(columnType);
    fetchTransactions(columnType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnType]);

  return (
    <>
      <Layout className="main-section scrollbar">
        <PortFolioTopbar
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyId={companyId}
        />
        <Content className="site-layout-background">
          <TransactionsBtnCollection setColumnType={setColumnType} />
          <TransactionTable
            column={column}
            transactions={transactions}
            columnType={columnType}
          />
        </Content>
      </Layout>
    </>
  );
};
