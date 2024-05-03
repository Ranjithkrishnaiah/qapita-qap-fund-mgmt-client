import { Select } from "antd";
import React, { useState } from "react";
import "./CompaniesGroupByColumns.scss";

export const CompaniesGroupByColumns: React.FC = () => {
  const ColumnItems = ["By Company", "By Country", "By Industry"];

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const handleChange = (selectedColumns: any) => {
    setSelectedColumns(selectedColumns);
  };

  const filteredOptions = ColumnItems.filter(
    (o) => !selectedColumns.includes(o)
  );

  return (
    <>
      <div className="GroupByFilterWrapper GroupByGroupWrapper">
        <h4>Group by</h4>
        <div className="visibleColumns__Block">
          <Select
            mode="multiple"
            placeholder="Group by"
            value={selectedColumns}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};
