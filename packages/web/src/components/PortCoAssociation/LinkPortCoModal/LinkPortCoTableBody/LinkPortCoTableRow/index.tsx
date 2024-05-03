import { Checkbox } from "antd";
import React, { ReactElement } from "react";
import { useState } from "react";
import AcceptedIcon from "../../../../shared/icons/AcceptedIcon";
import "./linkPortCoTableRow.scss";

type qmapCompaniesObject = {
  issuerId: number;
  issuerName: string;
  isSelfManaged: boolean;
  isLinked: boolean;
  checkedIssuerID: number;
  setcheckedIssuerID: (a: number) => void;
};

export const LinkPortCoTableRow = ({
  issuerId,
  issuerName,
  isSelfManaged,
  isLinked,
  checkedIssuerID,
  setcheckedIssuerID,
}: qmapCompaniesObject): ReactElement => {
  // const [list, setList] = useState();
  const list: any = [];

  const handleOnChange = (e) => {
    if (e.target.checked) {
      setcheckedIssuerID(issuerId);
      list.push(checkedIssuerID);
    } else {
      setcheckedIssuerID(0);
    }
  };

  return (
    <>
      <div className="TableBody gridTableBody gridContainer">
        <div className="gridItem">
          <h4>
            <Checkbox
              onChange={handleOnChange}
              // disabled={isLinked || isSelfManaged === true ? true : false}
            >
              <div className="TableBodyCheckbocContent">
                <span>{issuerName}</span>
              </div>
            </Checkbox>
          </h4>
        </div>
        <div className="gridItem">
          <h4
            className={
              isLinked || isSelfManaged === true
                ? "SelfManagedStatus"
                : "FundManagedStatus"
            }
          >
            {isSelfManaged === true ? "Company Managed" : "Fund Managed"}
          </h4>
        </div>
      </div>
    </>
  );
};
