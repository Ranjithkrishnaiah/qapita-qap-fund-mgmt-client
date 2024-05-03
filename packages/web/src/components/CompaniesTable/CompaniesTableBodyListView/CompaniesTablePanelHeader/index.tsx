import React, { ReactElement, useState } from "react";
import "./CompaniesTablePanelHeader.scss";

import Img from "../../../../../assets/images/tomato.svg";
import CompanyValuationIcon from "../../../shared/icons/CompanyValuationIcon";

type CompaniesTableBodyListView = {
  data: {
    portfolioCompany: "";
    transactionDate: "";
    capitalInvested: "";
    ownership: "";
    companyValuation: "";
    realizedValue: "";
    multiple: "";
    IRR: "";
    gainLoss: "";
    RVPI: "";
    DVPI: "";
    sector: "";
    subSector: "-";
    securityClass: "";
    dilutedOwnership: "";
    noOfSecurities: "";
    cashFlow: "";
  };
};

export const CompaniesTablePanelHeader = ({
  data,
}: CompaniesTableBodyListView): ReactElement => {
  return (
    <>
      <div className="companiesTableBody gridElement">
        <div className="gridItem proctoImgBlock">
          <img src={Img} className="protcoImg" />
          <h4>{data.portfolioCompany}</h4>
        </div>
        <div className="gridItem">
          <h4>{data.transactionDate}</h4>
          <span>Transaction Date</span>
        </div>
        <div className="gridItem">
          <h4>{data.capitalInvested}</h4>
          <span>Capital Invested</span>
        </div>
        <div className="gridItem">
          <h4>{data.ownership}%</h4>
          <span>Ownership%</span>
        </div>
        <div className="gridItem companyValuationBlock">
          <h4>
            {data.companyValuation} <CompanyValuationIcon />
          </h4>
          <span>Company Valuation</span>
        </div>
        <div className="gridItem">
          <h4>{data.realizedValue}</h4>
          <span>Realized Value</span>
        </div>
        <div className="gridItem">
          <h4>{data.multiple}x</h4>
          <span>Multiple</span>
        </div>
        <div className="gridItem">
          <h4>{data.IRR}%</h4>
          <span>IRR%</span>
        </div>
        <div className="gridItem">
          <h4>{data.gainLoss}</h4>
          <span>Gain/Loss</span>
        </div>
        <div className="gridItem">
          <h4>{data.RVPI}</h4>
          <span>RVPI</span>
        </div>
        <div className="gridItem">
          <h4>{data.DVPI}</h4>
          <span>DVPI</span>
        </div>
        <div className="gridItem">
          <h4>{data.sector}</h4>
          <span>Sector</span>
        </div>
        <div className="gridItem">
          <h4>{data.subSector}</h4>
          <span>Sub Sector</span>
        </div>
        <div className="gridItem">
          <h4>{data.securityClass}</h4>
          <span>Security Class</span>
        </div>
        <div className="gridItem">
          <h4>{data.dilutedOwnership}</h4>
          <span>Diluted Ownership</span>
        </div>
        <div className="gridItem">
          <h4>{data.noOfSecurities}</h4>
          <span>No. of Securities</span>
        </div>
      </div>
    </>
  );
};
