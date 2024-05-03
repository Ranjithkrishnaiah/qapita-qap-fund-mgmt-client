import React from "react";
import { TableComponent } from "./TableComponent";

interface PerformanceTableProps {
  tableHead: any[];
  data: any[];
}

export const PerformanceTable: React.FC<PerformanceTableProps> = ({
  tableHead,
  data,
}) => {
  //service call of fund or investment for required table cols and table data
  // const data = [
  //   {
  //     key: "1",
  //     portco: "Giggy",
  //     transDate: "Jul 22 2021",
  //     capital: "875,5",
  //     ownership: "22%",
  //     children: [
  //       {
  //         key: "11",
  //         transDate: "Jul 22 2021",
  //         capital: "875,524",
  //         ownership: "22%",
  //         valuation: "101,641,200",
  //         realizedVal: "100,000",
  //       },
  //       {
  //         key: "12",
  //         transDate: "Jul 22 2021",
  //         capital: "875,524",
  //         ownership: "22%",
  //         valuation: "101,641,200",
  //         realizedVal: "100,000",
  //         fairValue: "100,000",
  //       },
  //       {
  //         key: "13",
  //         transDate: "Jul 22 2021",
  //         capital: "875,524",
  //         ownership: "22%",
  //       },
  //     ],
  //     valuation: "101,641,200",
  //     realizedVal: "100,000",
  //     multiple: "6.3x",
  //     irr: "20%",
  //     fairValue: "100,000",
  //     dvpi: "2000",
  //     subSector: "985,524",
  //     cashflow: "1000",
  //     securities: "220",
  //     industry: "1000",
  //   },
  //   {
  //     key: "2",
  //     portco: "Kuber",
  //     transDate: "May 13 2021",
  //     capital: "985,524",
  //     ownership: "16%",
  //     valuation: "44,471,000",
  //     realizedVal: "100,000",
  //     multiple: "5.3x",
  //     irr: "10%",
  //     fairValue: "100,000",
  //     value: "5.3",
  //     dvpi: "2000",
  //     subSector: "985,524",
  //     cashflow: "1000",
  //     securities: "220",
  //   },
  // ];

  return <TableComponent cols={tableHead} data={data} />;
};
