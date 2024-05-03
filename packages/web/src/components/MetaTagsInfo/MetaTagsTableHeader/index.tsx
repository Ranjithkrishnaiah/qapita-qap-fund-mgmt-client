import React from "react";
import "./metaTagsTableHeader.scss";

export const MetaTagsTableHeader: React.FC = () => {
  return (
    <>
      <div className="MetaTagsTableHeader gridTableHeader gridContainer">
        <div className="gridItem">
          <h4>Meta Tag</h4>
        </div>
        <div className="gridItem">
          <h4>Values</h4>
        </div>
        <div className="gridItem text-right"></div>
      </div>
    </>
  );
};
