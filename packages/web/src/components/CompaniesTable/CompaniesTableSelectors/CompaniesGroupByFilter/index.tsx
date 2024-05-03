import React, { Fragment, useState } from "react";
import { Collapse, Input, Radio, Select, Checkbox, Button } from "antd";
import "./CompaniesGroupByFilter.scss";
import { useEffect } from "react";
import { UpOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Search } = Input;

interface CompanyGroupByProps {
  filterData: any;
  setActiveFilter: (filterData: any[]) => void;
  handleVisibleChange: (flag: any) => void;
}
export const CompaniesGroupByFilter: React.FC<CompanyGroupByProps> = ({
  filterData,
  setActiveFilter,
  handleVisibleChange,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [gridViewValue, setGridViewValue] = useState("Compact");
  const [accordionData, setAccordionData] = useState<any[]>([]);

  const ColumnItems = [
    "Portfolio Company",
    "Transaction Date",
    "Ownership",
    "Invested",
    "Valuation",
    "Multiple",
    "Current/Fair Value",
    "Gain/Loss",
    "IRR%",
    "DVPI",
    "Sub Sector",
    "Cashflow",
    "No .of Securities",
    "Sector",
    "Diluted Ownership",
  ];

  const handleChange = (selectedColumns: any) => {
    setSelectedColumns(selectedColumns);
  };

  const filteredOptions = ColumnItems.filter(
    (o) => !selectedColumns.includes(o)
  );

  const onGridViewValueHandler = (e: any) => {
    setGridViewValue(e.target.value);
  };

  const checkBoxChange = (key, innerElement) => {
    const data = accordionData.map((element) => {
      if (element.key === key) {
        element.body.forEach((innerValue) => {
          if (innerValue.key === innerElement.key) {
            innerValue.checked = !innerValue.checked;
          }
          return innerValue;
        });
        return element;
      }
      return element;
    });
    setAccordionData([...data]);
  };

  const resetDefault = () => {
    setAccordionData([...filterData]);
  };
  const saveBtn = () => {
    const filterElements = accordionData.filter((data) => {
      const selectedElement = data.body.filter((element) => element.checked);
      if (selectedElement.length > 0) {
        return data;
      }
    });
    const activeFilters = filterElements.map((element) => {
      return {
        [element.head]: element.body.map((innerElement) => innerElement.name),
      };
    });
    setActiveFilter(activeFilters);
    handleVisibleChange(false);
  };

  useEffect(() => {
    setAccordionData(JSON.parse(JSON.stringify(filterData)));
  }, [filterData]);

  return (
    <>
      <div className="GroupByFilterWrapper" style={{ paddingTop: 10 }}>
        {/* <h4>Filters</h4> */}
        {/* <div className="GroupByFilterWrapper__search">
          <Search size="large" placeholder="Search" />
        </div> */}
        <div
          className={`GroupByFilterWrapper__accordion ${
            filterData.length > 6 && "accordionContainer"
          }`}
        >
          <Collapse
            accordion
            className="GroupByFilterWrapper__accordionBlock"
            expandIcon={({ isActive }) => (
              <UpOutlined rotate={isActive ? 180 : 0} />
            )}
            expandIconPosition={"right"}
          >
            {/* <Panel header="Visible columns" key="1" className="visibleColumns">
              <div className="visibleColumns__Block">
                <Select
                  mode="multiple"
                  placeholder="Visible columns"
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
            </Panel> */}
            {accordionData.map((element) => {
              const { head, key, body } = element;
              return (
                <Panel header={head} key={key}>
                  {body.map((innerElement) => (
                    <Fragment key={innerElement.name}>
                      <Checkbox
                        onChange={() => checkBoxChange(key, innerElement)}
                        checked={innerElement.checked}
                        className="checkbox"
                      >
                        {innerElement.name}
                      </Checkbox>
                      <br />
                    </Fragment>
                  ))}
                </Panel>
              );
            })}
          </Collapse>
        </div>
        <div className="btnContainer" style={{ padding: "20px" }}>
          <Button type="primary" className="saveBtn" onClick={() => saveBtn()}>
            Save
          </Button>
          <Button
            type="link"
            className="resetBtn"
            onClick={() => resetDefault()}
          >
            Reset Default
          </Button>
        </div>
      </div>
    </>
  );
};
