import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import "./companiesTable.scss";
import { CompaniesTableBodyGridView } from "./CompaniesTableBodyGridView";
import { CompaniesTableBodyListView } from "./CompaniesTableBodyListView";
import { CompaniesTableHeader } from "./CompaniesTableHeader";
import { CompaniesTableSelectors } from "./CompaniesTableSelectors";
import { PerformanceTable } from "../PerformanceTable";

type CustomHeadProps = {
  title: string;
  desc: string;
};
const CustomHead = ({ title, desc }: CustomHeadProps) => (
  <p className="customTableHead">
    {title}
    <br />
    <span className="headDescription">{desc}</span>
  </p>
);

export const columns = [
  {
    title: "Portfolio Company",
    dataIndex: "portfolioCompanyDefault",
    key: "portfolioCompany",
  },
  {
    title: "Transaction Date",
    dataIndex: "transactionDateDefault",
    key: "transactionDate",
  },
  {
    title: "Ownership",
    dataIndex: "ownershipDefault",
    key: "ownership",
  },
  {
    title: "Capital Invested",
    dataIndex: "capitalInvestedDefault",
    key: "capitalInvested",
    description: "(USD)",
  },
  {
    title: "Company Valuation",
    dataIndex: "companyValuationDefault",
    key: "companyValuation",
    description: "(USD)",
  },
  {
    title: "Unrealized Value",
    dataIndex: "unrealizedValueDefault",
    key: "realizedValue",
    description: "(USD)",
  },
  {
    title: "Realized Value",
    dataIndex: "realizedValueDefault",
    key: "realizedValue",
    description: "(USD)",
  },
  {
    title: "Multiple",
    dataIndex: "multipleDefault",
    key: "multiple",
    description: "(MoIC)",
  },
  {
    title: "Current/Fair Value",
    dataIndex: "fairValueDefault",
    key: "fairValue",
  },
  {
    title: "Gain/Loss",
    dataIndex: "gainDefault",
    key: "gain",
  },
  {
    title: "IRR%",
    dataIndex: "irrDefault",
    key: "irr%",
  },
  {
    title: "DVPI",
    dataIndex: "dvpiDefault",
    key: "dvpi",
  },
  {
    title: "Cashflow",
    dataIndex: "cashflowDefault",
    key: "cashflow",
  },
  {
    title: "No. of Securities",
    dataIndex: "securitiesCountDefault",
    key: "securitiesCount",
  },
  {
    title: "Diluted Ownership",
    dataIndex: "dilutedOwnershipDefault",
    key: "dilutedOwnership",
  },
];

const data = [
  {
    key: "1",
    portfolioCompanyDefault: "Giggy",
    transactionDateDefault: "Jul 22 2021",
    capitalInvestedDefault: "875,5",
    ownershipDefault: "22%",
    children: [
      {
        key: "11",
        transactionDateDefault: "Jul 22 2021",
        capitalInvestedDefault: "875,524",
        ownershipDefault: "22%",
        companyValuationDefault: "101,641,200",
        realizedVal: "100,000",
      },
      {
        key: "12",
        transactionDateDefault: "Jul 22 2021",
        capitalInvestedDefault: "875,524",
        ownershipDefault: "22%",
        companyValuationDefault: "101,641,200",
        realizedVal: "100,000",
        fairValueDefault: "100,000",
      },
      {
        key: "13",
        transactionDateDefault: "Jul 22 2021",
        capitalInvestedDefault: "875,524",
        ownershipDefault: "22%",
      },
    ],
    companyValuationDefault: "101,641,200",
    realizedValueDefault: "100,000",
    multipleDefault: "6.3x",
    irrDefault: "20%",
    fairValueDefault: "100,000",
    dvpiDefault: "2000",
    subSectorDefault: "985,524",
    cashflowDefault: "1000",
    securitiesCountDefault: "220",
    industry: "1000",
    unrealizedValueDefault: "10000",
  },
  {
    key: "2",
    portfolioCompanyDefault: "Kuber",
    transactionDateDefault: "May 13 2021",
    capitalInvestedDefault: "985,524",
    ownershipDefault: "16%",
    companyValuationDefault: "44,471,000",
    realizedValueDefault: "100,000",
    multipleDefault: "5.3x",
    irrDefault: "10%",
    fairValueDefault: "100,000",
    gainDefault: "5.3",
    dvpiDefault: "2000",
    subSectorDefault: "985,524",
    cashflowDefault: "1000",
    securitiesCountDefault: "220",
    unrealizedValueDefault: "210000",
  },
];
// to convert dataIndex value to objects
export const constructTableObject = (array, key) => {
  const updatedColumn = array.map((col) => {
    const presentElement = columns.find((element) => {
      return element[key] === col;
    });
    if (presentElement) {
      return presentElement;
    } else {
      return {
        title: col,
        dataIndex: col,
        key: col,
      };
    }
  });
  return updatedColumn;
};

export const CompaniesTable: React.FC = () => {
  const [companiesTableView, setCompaniesTableView] = useState("listView");
  const [visibleColumnHead, setVisibleColumnHead] = useState<
    {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[]
  >([]);
  const [companiesData, setCompaniesData] = useState([]);
  const { getClient } = useContext(ApplicationContext);
  const service = getClient().InvestmentCompaniesTableService();
  const metaTagService = getClient().getMetaTagsInfoService();
  const [initialColumnHead, setInitialColumnHead] = useState<
    {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[]
  >([]);
  const [tableHead, setTableHead] = useState<any[]>([]);
  const [tableBody, setTableBody] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<any[]>([]);

  const handleVisibleColumHead = (
    columns: {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[]
  ) => {
    setVisibleColumnHead(columns);
  };

  const fetchData = async () => {
    let localColumn: {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[] = [];
    let localInitialColumn: {
      title: string;
      dataIndex: string;
      key: string;
      description?: string;
    }[] = [];
    let isTenatbased = null;
    await service.getVisibleColumnsData().then(async (response: any) => {
      const columnHead = response?.dashboardConfig?.investmentsTable?.columns;
      isTenatbased = response.isTenantBasedConfig;
      localInitialColumn = columns;
      localColumn = constructTableObject(columnHead, "dataIndex");
    });
    await metaTagService.getMetaTagsInfo().then((res: any) => {
      const metaTags: string[] = [];
      const filterMetaTag: { key: string; head: string; body: any }[] = [];
      res.map((metaTag, index) => {
        filterMetaTag.push({
          key: (index + 1).toString(),
          head: metaTag.name,
          body: metaTag.values.map((value, index) => {
            return { name: value, checked: true, key: (index + 1).toString() };
          }),
        });
        return metaTags.push(metaTag.name);
      });
      setFilterData(filterMetaTag);
      localInitialColumn = [
        ...localInitialColumn,
        ...constructTableObject(metaTags, "dataIndex"),
      ];
      if (!isTenatbased) {
        // to add meta tags
        localColumn = [
          ...localColumn,
          ...constructTableObject(metaTags, "dataIndex"),
        ];
      } else {
        // to remove unwanted meta tags
        localColumn = localColumn.filter((column) => {
          const findElementColumns = columns.find(
            (elem) => elem.dataIndex === column.dataIndex
          );
          const findElementMetaTags = metaTags.includes(column.dataIndex);
          return findElementColumns || findElementMetaTags;
        });
      }
    });
    setInitialColumnHead(localInitialColumn);
    setVisibleColumnHead(localColumn);
  };

  useEffect(() => {
    service.getInvestmentCompaniesTableData().then((response: any) => {
      setCompaniesData(response);
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTableHead = (columns) => {
    const updatedColumns = columns.map(
      (column: {
        title: any;
        dataIndex: string;
        key: string;
        description?: any;
      }) => {
        if (column.description) {
          column = {
            ...column,
            title: (
              <CustomHead title={column.title} desc={column.description} />
            ),
          };
        }
        return column;
      }
    );
    return updatedColumns;
  };

  useEffect(() => {
    if (visibleColumnHead.length) {
      setTableHead(updateTableHead(visibleColumnHead));
    } else {
      setTableHead(updateTableHead(columns));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumnHead]);

  return (
    <>
      <div className="companiesTableWrapper">
        <CompaniesTableSelectors
          companiesTableView={companiesTableView}
          setCompaniesTableView={setCompaniesTableView}
          visibleColumnHead={visibleColumnHead}
          handleVisibleColumHead={handleVisibleColumHead}
          initialColumnHead={initialColumnHead}
          filterData={filterData}
          setActiveFilter={setActiveFilter}
        />

        {/* <div className="gridContainer"> */}
        <div className="antdPerformTableContainer">
          {companiesTableView === "listView" ? (
            <>
              {/* <CompaniesTableHeader />
                <CompaniesTableBodyListView /> */}

              <PerformanceTable tableHead={tableHead} data={data} />
            </>
          ) : (
            <>
              <div className="CompaniesTableCard_wrapper">
                {companiesData.map((el, index) => {
                  return <CompaniesTableBodyGridView data={el} key={index} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
