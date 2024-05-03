import React from "react";
import "./CompaniesTableHeader.scss";

export const CompaniesTableHeader: React.FC = () => {
  return (
    <>
      <div className="companiesTableHeader gridElement">
        <div className="gridItem">
          <h4>Portfolio Company</h4>
        </div>
        <div className="gridItem">
          <h4>Transaction Date</h4>
        </div>
        <div className="gridItem">
          <h4>
            Capital Invested <span>(USD)</span>
          </h4>
        </div>
        <div className="gridItem">
          <h4>Ownership%</h4>
        </div>
        <div className="gridItem">
          <h4>
            Company Valuation <span>(USD)</span>
          </h4>
        </div>
        <div className="gridItem">
          <h4>
            Realized Value <span>(USD)</span>
          </h4>
        </div>
        <div className="gridItem">
          <h4>
            Multiple <span>(MoIC)</span>
          </h4>
        </div>
        <div className="gridItem">
          <h4>IRR%</h4>
        </div>
        <div className="gridItem">
          <h4>
            Gain/Loss <span>(USD)</span>
          </h4>
        </div>
        <div className="gridItem">
          <h4>RVPI</h4>
        </div>
        <div className="gridItem">
          <h4>DVPI</h4>
        </div>
        <div className="gridItem">
          <h4>Sector</h4>
        </div>
        <div className="gridItem">
          <h4>Sub Sector</h4>
        </div>
        <div className="gridItem">
          <h4>Security Class</h4>
        </div>
        <div className="gridItem">
          <h4>Diluted Ownership</h4>
        </div>
        <div className="gridItem">
          <h4>No. of Securities</h4>
        </div>
        <div className="gridItem">
          <h4>Cash Flow</h4>
        </div>
      </div>
    </>
  );
};
