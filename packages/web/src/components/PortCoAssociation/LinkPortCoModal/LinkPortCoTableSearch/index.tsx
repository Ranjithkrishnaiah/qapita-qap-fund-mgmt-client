import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import "./linkPortCoTableSearch.scss";

export const LinkPortCoTableSearch: React.FC = () => {
  return (
    <>
      <div className="linkPortCoTable_Search">
        <Input
          size="large"
          placeholder="Search PortCo"
          prefix={<SearchOutlined />}
        />
      </div>
    </>
  );
};
