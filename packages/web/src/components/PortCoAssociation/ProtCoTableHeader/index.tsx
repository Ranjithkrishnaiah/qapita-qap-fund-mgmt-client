import React from "react";
import "./portcoTableHeader.scss";

export const PortCoTableHeader: React.FC = () => {
  return (
    <>
      <div className="PortTagsTableHeader gridTableHeader gridContainer">
        <div className="gridItem">
          <h4>Portfolio Company</h4>
        </div>
        <div className="gridItem">
          <h4>Request Status</h4>
        </div>
        <div className="gridItem">
          <h4>Meta Tag</h4>
        </div>
        <div className="gridItem text-right"></div>
      </div>
    </>
  );
};
