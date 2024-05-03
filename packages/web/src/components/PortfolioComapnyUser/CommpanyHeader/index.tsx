import React from "react";
import "./companyHeader.scss";

export const CompanyTableHeader: React.FC = () => {
  return (
    <>
      <div className="PortTableHeader gridTableHeader gridContainer">
        <div className="gridItem">
          <h4>Name</h4>
        </div>
        <div className="gridItem">
          <h4>Description</h4>
        </div>
        <div className="gridItem">
          <h4>Modified</h4>
        </div>
        <div className="gridItem ">
          <h4>Who can access</h4>
        </div>
      </div>
    </>
  );
};
