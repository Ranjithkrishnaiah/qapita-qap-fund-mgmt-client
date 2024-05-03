import { Checkbox } from "antd";
import React, { ReactElement } from "react";
import "./linkPortCoTableHeader.scss";

type LinkPortCoTableHeaderProps = {
  setCheckAll: (a: boolean) => void;
  checkAll: boolean;
};

export const LinkPortCoTableHeader = ({
  setCheckAll,
  checkAll,
}: LinkPortCoTableHeaderProps): ReactElement => {
  const handleOnChange = (e) => {
    if (e.target.checked) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };

  return (
    <>
      <div className="TableHeader gridTableHeader gridContainer">
        <div className="gridItem">
          <h4>
            <div className="TableHeaderCheckbocContent">
              <Checkbox onChange={handleOnChange}>Company</Checkbox>
            </div>
          </h4>
        </div>
        <div className="gridItem">
          <h4>Managed By</h4>
        </div>
      </div>
    </>
  );
};
