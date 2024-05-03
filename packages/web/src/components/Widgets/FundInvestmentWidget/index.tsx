import React, { ReactElement, useEffect, useState } from "react";
import "./FundInvestmentWidget.scss";
import { FairValue } from "../InvestmentWidget/InvestmentCards/FairValue";
import { TotalCapitalInvested } from "../InvestmentWidget/InvestmentCards/TotalCapitalInvested";
import { Multiple } from "../InvestmentWidget/InvestmentCards/Multiple";
import { GainLoss } from "../InvestmentWidget/InvestmentCards/GainLoss";
import { RealizedValue } from "../InvestmentWidget/InvestmentCards/RealizedValue";
import { PortCo } from "../CompanyOverviewWidget/CompanyOverviewCards/Portfolio";
import { Funds } from "../CompanyOverviewWidget/CompanyOverviewCards/Funds";
import axios from "axios";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

export const FundInvestmentWidget = (): ReactElement => {
  interface InvestmentInterface {
    fundsCount: number;
    portfolioCompaniesCount: number;
    investmentSummary: {
      totalCapitalInvested: { amount: number; currency: { code: string } };
      fairValue: { amount: number; currency: { code: string } };
      profit: { amount: number; currency: { code: string } };
      realizedValue: { amount: number; currency: { code: string } };
      multiple: number;
      irr: number;
    };
  }

  type FundObject = {
    id: string;
    name: { brandName: string; legalName: string };
  };

  const [investmentData, setInvestmentData] = useState<InvestmentInterface>();

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getFirmDashboardService();
  const [fundsData, setFundsData] = useState<FundObject[]>();
  const client = getClient().getSidebarService();

  useEffect(() => {
    service.getFirmDashboardStats().then((res: any) => setInvestmentData(res));
    client.getSidebarFunds().then((res: any) => setFundsData(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <>
      <div className="fundInvestmentWidgetWrapper">
        <div className="fundsgridElement element__funds">
          <Funds data={fundsData?.length} />
        </div>
        <div className="fundsgridElement element__capitalInvested">
          <TotalCapitalInvested
            data={investmentData?.investmentSummary.totalCapitalInvested}
          />
        </div>
        <div className="fundsgridElement element__gainLoss">
          <GainLoss data={investmentData?.investmentSummary.profit} />
        </div>
        <div className="fundsgridElement element__multiple">
          <Multiple data={investmentData?.investmentSummary.multiple} />
        </div>
        <div className="fundsgridElement element__fairValue">
          <FairValue data={investmentData?.investmentSummary.fairValue} />
        </div>
        <div className="fundsgridElement element__realizedValue">
          <RealizedValue
            data={investmentData?.investmentSummary.realizedValue}
          />
        </div>
        <div className="fundsgridElement element__portfolioCompanies">
          <PortCo data={investmentData?.portfolioCompaniesCount} />
        </div>
      </div>
    </>
  );
};
