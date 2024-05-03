import { Select, Button } from "antd";
import React, { useContext, useState, Fragment } from "react";
import { constructTableObject } from "../..";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import "../CompaniesGroupByFilter/CompaniesGroupByFilter.scss";
import "./CompaniesVisibleColumns.scss";
import { CloseOutlined } from "@ant-design/icons";

type CompaniesVisibleColumnsProps = {
  handleVisibleColumns: () => void;
  visibleColumnHead: {
    title: string;
    dataIndex: string;
    key: string;
    description?: string;
  }[];
  handleVisibleColumHead: (
    columns: {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[]
  ) => void;
  initialColumnHead: {
    title: string;
    dataIndex: string;
    key: string;
    description?: string;
  }[];
  visibleColumns;
};
function CompaniesVisibleColumns({
  handleVisibleColumns,
  visibleColumnHead,
  handleVisibleColumHead,
  initialColumnHead,
  visibleColumns,
}: CompaniesVisibleColumnsProps) {
  const [selectedColumns, setSelectedColumns] = useState<
    {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[]
  >(visibleColumnHead);
  const filteredOptions = initialColumnHead.filter((column) => {
    return !selectedColumns.find(
      (col) => column.dataIndex === col.dataIndex && col.title === column.title
    );
  });
  const handleChange = (selectedColumns: any) => {
    setSelectedColumns(constructTableObject(selectedColumns, "title"));
  };
  const resetDefault = () => setSelectedColumns(initialColumnHead);
  const { getClient, userId } = useContext(ApplicationContext);
  const saveBtn = () => {
    const service = getClient().InvestmentCompaniesTableService();
    const postColumn = selectedColumns.map((column) => column.dataIndex);
    service.putVisibleColumnData(postColumn).then((res) => {
      handleVisibleColumHead(selectedColumns);
      handleVisibleColumns();
    });
  };

  const selectColumns = (item: any) => {
    const localColumns = [...selectedColumns];
    localColumns.push(item);
    setSelectedColumns(localColumns);
  };

  const removeColumns = (column) => {
    const filterColumn = selectedColumns.filter(
      (col) => col.dataIndex !== column.dataIndex
    );
    setSelectedColumns(filterColumn);
  };

  return (
    <div className="GroupByFilterWrapper" style={{ padding: "20px" }}>
      <div className="visibleColumns__Block">
        <h4>Visible columns</h4>
        {/* <Select
          mode="multiple"
          placeholder="Visible columns"
          value={selectedColumns.map((column) => column.title)}
          onChange={handleChange}
          style={{ width: "100%" }}
          open={false}
        >
          {filteredOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select> */}
        <div className="selectedColumnContainer">
          {selectedColumns.map((column) => (
            <div key={column.dataIndex} className="selectedColumnContent">
              <span className="selectedColumnTitle">{column.title}</span>
              <CloseOutlined
                onClick={() => removeColumns(column)}
                className="closeIcon"
              />
            </div>
          ))}
          {!selectedColumns.length && (
            <div style={{ paddingLeft: 8 }}>
              <span className="ant-select-selection-placeholder">
                Visible columns
              </span>
            </div>
          )}
        </div>
        <div
          className={
            filteredOptions.length > 0
              ? `optionContainer ${
                  filteredOptions.length > 5 && "optionContainerHeight"
                }`
              : ""
          }
        >
          {filteredOptions.map((item) => (
            <Fragment key={item.dataIndex}>
              <button className="options" onClick={() => selectColumns(item)}>
                {item.title}
              </button>
              <br />
            </Fragment>
          ))}
        </div>
      </div>
      <div className="btnContainer">
        <Button type="primary" className="saveBtn" onClick={() => saveBtn()}>
          Save
        </Button>
        <Button type="link" className="resetBtn" onClick={() => resetDefault()}>
          Reset default
        </Button>
      </div>
    </div>
  );
}

export default CompaniesVisibleColumns;
