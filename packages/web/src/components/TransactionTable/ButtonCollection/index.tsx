import React from "react";
import "./btnCollection.scss";
import { TransactionSelectBtn } from "../Buttons/TransactionSelect";

type TransactionsBtnCollectionProps = {
  setColumnType: (a: string) => void;
};

export const TransactionsBtnCollection = ({
  setColumnType,
}: TransactionsBtnCollectionProps) => {
  return (
    <div className="transactionsBtnCont">
      <TransactionSelectBtn setColumnType={setColumnType} />
    </div>
  );
};
