import {
  AppstoreOutlined,
  DownloadOutlined,
  DownOutlined,
  UnorderedListOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { Dropdown, Radio } from "antd";
import React, { useState } from "react";
import FilterIcon from "../../shared/icons/FilterIcon";
import { CompaniesGroupByColumns } from "./CompaniesGroupByColumns";
import { CompaniesGroupByFilter } from "./CompaniesGroupByFilter";
import "./CompaniesTableSelectors.scss";
import GridImg from "../../../../assets/images/grid.svg";
import DullGridImg from "../../../../assets/images/grid-dull.png";
import CompaniesVisibleColumns from "./CompaniesVisibleColumns";
import SelectorGridIcon from "../../shared/icons/SelectorGridIcon/SelectorGridIcon";

interface CompanyTableViewProps {
  companiesTableView: string;
  setCompaniesTableView: (a: string) => void;
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
  filterData: any;
  setActiveFilter: (filterData: any[]) => void;
}

export const CompaniesTableSelectors: React.FC<CompanyTableViewProps> = ({
  companiesTableView,
  setCompaniesTableView,
  visibleColumnHead,
  handleVisibleColumHead,
  initialColumnHead,
  filterData,
  setActiveFilter,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleGroupBlock, setVisibleGroupBlock] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(false);

  const handleVisibleChange = (flag: any) => {
    setVisible(flag);
  };

  const handleVisibleGroupBlockChange = (flag: any) => {
    setVisibleGroupBlock(flag);
  };

  const GroupByColumns = (
    <div>
      <CompaniesGroupByColumns />
    </div>
  );

  const GroupByFilter = (
    <div>
      <CompaniesGroupByFilter
        filterData={filterData}
        setActiveFilter={setActiveFilter}
        handleVisibleChange={handleVisibleChange}
      />
    </div>
  );

  const onCompaniesTableViewHandler = (e: any) => {
    setCompaniesTableView(e.target.value);
  };

  const handleVisibleColumns = () => {
    setVisibleColumns(false);
  };

  return (
    <>
      <div className="companiesTableSelectors">
        <div className="companiesTableSelectors__title">
          <h2>Companies</h2>
        </div>

        <div className="companiesTableSelectors__filters">
          <div className="companiesTableSelectors__groupBy">
            <h4>Group by:</h4>
            <div className="groupByBlock groupByGroup">
              <div className="groupByGroupBlock">
                <Dropdown
                  overlay={GroupByColumns}
                  trigger={["click"]}
                  placement="bottomRight"
                  visible={visibleGroupBlock}
                  onVisibleChange={handleVisibleGroupBlockChange}
                >
                  <div className="selectors__dropdownFilterIcon">
                    <span className="spanFilterIcon">
                      <VerticalAlignMiddleOutlined />
                    </span>
                    <span className="spanDropdownIcon">
                      <DownOutlined />
                    </span>
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="groupByBlock groupByFilter">
              <div className="groupByFilterBlock">
                <Dropdown
                  overlay={GroupByFilter}
                  trigger={["click"]}
                  placement="bottomRight"
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                >
                  <div className="selectors__dropdownFilterIcon">
                    <span className="spanFilterIcon">
                      <FilterIcon />
                    </span>
                    <span className="spanDropdownIcon">
                      <DownOutlined />
                    </span>
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="groupByBlock groupByDownload">
              <DownloadOutlined />
            </div>
            <div
              className="groupByBlock groupByGroup"
              style={{ paddingLeft: 10 }}
            >
              <Dropdown
                overlay={
                  <CompaniesVisibleColumns
                    handleVisibleColumns={handleVisibleColumns}
                    visibleColumnHead={visibleColumnHead}
                    handleVisibleColumHead={handleVisibleColumHead}
                    initialColumnHead={initialColumnHead}
                    visibleColumns={visibleColumns}
                  />
                }
                trigger={["click"]}
                placement="bottomRight"
                visible={visibleColumns}
                onVisibleChange={setVisibleColumns}
              >
                <div className="selectors__dropdownFilterIcon">
                  <img
                    src={
                      visibleColumnHead.length === initialColumnHead.length
                        ? DullGridImg
                        : GridImg
                    }
                    height={26}
                  />
                </div>
              </Dropdown>
            </div>
            <div className="groupByBlock groupByViewType">
              <Radio.Group
                value={companiesTableView}
                onChange={onCompaniesTableViewHandler}
              >
                <Radio.Button value="listView">
                  <UnorderedListOutlined />
                </Radio.Button>
                <Radio.Button value="GridView">
                  <AppstoreOutlined />
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
