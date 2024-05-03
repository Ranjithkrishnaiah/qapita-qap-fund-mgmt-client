import React, { ReactElement } from "react";
import "./CompaniesTableBodyGridView.scss";
import Img from "../../../../assets/images/tomato.svg";
import { DoubleRightOutlined } from "@ant-design/icons";

type CompaniesTableBodyGridViewProps = {
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

export const CompaniesTableBodyGridView = ({
  data,
}: CompaniesTableBodyGridViewProps): ReactElement => {
  return (
    <>
      <div className="CompaniesTableCard">
        <div className="CompaniesTableCard__content">
          <div className="CompaniesTableCard__front">
            <div className="CompaniesTableCard__frontTitle">
              <img src={Img} />
              <h4>{data.portfolioCompany}</h4>
            </div>
            <div className="CompaniesTableCard__listing">
              <div className="CompaniesTableCard__listingGrid">
                <span>Capital Invested</span>
                <h4>{data.capitalInvested}</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>IRR%</span>
                <h4>{data.IRR}%</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>Realized Value</span>
                <h4>{data.realizedValue}</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>Multiple</span>
                <h4>{data.multiple}x</h4>
              </div>
            </div>
          </div>
          <div className="CompaniesTableCard__back">
            <div className="CompaniesTableCard__backArrow">
              <span>
                <DoubleRightOutlined />
              </span>
            </div>
            <div className="CompaniesTableCard__listing">
              <div className="CompaniesTableCard__listingGrid">
                <span>Security Class</span>
                <h4>{data.securityClass}</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>Ownership%</span>
                <h4>{data.ownership}%</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>Realized Value</span>
                <h4>{data.realizedValue}</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span># Of Securities</span>
                <h4>{data.noOfSecurities}</h4>
              </div>
              <div className="CompaniesTableCard__listingGrid">
                <span>Gain/Loss</span>
                <h4>{data.gainLoss}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
