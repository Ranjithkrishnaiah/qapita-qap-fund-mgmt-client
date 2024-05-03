import React, { useState } from "react";
import { Table, Button } from "antd";
import "antd/dist/antd.css";
import "./tableComponent.scss";
import { RightOutlined, DownOutlined } from "@ant-design/icons";

type TableComponentProps = {
  cols: any;
  data: any;
};

export const TableComponent = ({ cols, data }: TableComponentProps) => {
  const [expandedRows, setExpandedRows] = useState([""]);

  return (
    <div>
      <Table
        columns={cols}
        dataSource={data}
        pagination={false}
        className="performanceTable"
        expandIcon={({ expanded, onExpand, record }) => {
          return record.children !== undefined && expanded ? (
            <div className="performanceTableLogoCont">
              <DownOutlined
                onClick={(e) => {
                  const keys = expandedRows;
                  const indexOfElement = keys.indexOf(record.key);
                  keys.splice(indexOfElement, 1);
                  setExpandedRows(keys);
                  onExpand(record, e);
                }}
                //   style={{ marginLeft: "-7px" }}
              />
            </div>
          ) : record.children !== undefined && !expanded ? (
            <div className="performanceTableLogoCont">
              <RightOutlined
                onClick={(e) => {
                  const keys = expandedRows;
                  const expandedKeys: any[] = keys.concat(record.key);
                  setExpandedRows(expandedKeys);
                  onExpand(record, e);
                }}
                //   style={{ marginLeft: "-10px" }}
              />
            </div>
          ) : (
            <div className="performanceTableLogoCont"></div>
          );
        }}
        rowClassName={(record, index) => {
          const key: string = record.key;
          if (expandedRows.includes(key)) {
            return "expandedRowClassName";
          }
          return "";
        }}
        scroll={{ x: true }}
      />
    </div>
  );
};
