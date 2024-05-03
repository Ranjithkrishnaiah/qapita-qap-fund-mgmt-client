import React, { ReactElement, useContext, useEffect, useState } from "react";
import "./CompaniesTableBodyListView.scss";
import { Collapse } from "antd";
import Img from "../../../../assets/images/tomato.svg";
import CompanyValuationIcon from "../../shared/icons/CompanyValuationIcon";
import { CompaniesTablePanelHeader } from "./CompaniesTablePanelHeader";
import { CompaniesTablePanelBody } from "./CompaniesTablePanelBody";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

const { Panel } = Collapse;

const DUMMYDATA = [
  {
    portfolioCompany: "Tamato",
    transactionDate: "-",
  },
  {
    portfolioCompany: "Orange",
    transactionDate: "-",
  },
  {
    portfolioCompany: "Giggy",
    transactionDate: "-",
  },
];

export const CompaniesTableBodyListView = (): ReactElement => {
  const [companiesData, setCompaniesData] = useState([]);
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().InvestmentCompaniesTableService();

  const onChangeHandler = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    service.getInvestmentCompaniesTableData().then((response: any) => {
      setCompaniesData(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  return (
    <>
      <Collapse
        onChange={onChangeHandler}
        accordion={true}
        className="companiesTable__accordion"
      >
        {companiesData.map((el, index) => {
          return (
            <Panel header={<CompaniesTablePanelHeader data={el} />} key={index}>
              <CompaniesTablePanelBody />
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
};
