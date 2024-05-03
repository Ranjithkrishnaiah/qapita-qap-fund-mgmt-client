import React, { ReactElement, useEffect, useState } from "react";
import "./fundPerformanceWidget.scss";
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

export const FundPerformanceWidget = (): ReactElement => {
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

  const [investmentData, setInvestmentData] = useState<InvestmentInterface>();

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getFirmDashboardService();

  useEffect(() => {
    service.getFirmDashboardStats().then((res: any) => setInvestmentData(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <>
      <div className="fundInvestmentWidgetWrapper fundPerformanceWidgetWrapper">
        <div className="fundsgridElement">
          <PortCo data={investmentData?.portfolioCompaniesCount} />
        </div>
        <div className="fundsgridElement">
          <TotalCapitalInvested
            data={investmentData?.investmentSummary.totalCapitalInvested}
          />
        </div>
        <div className="fundsgridElement">
          <GainLoss data={investmentData?.investmentSummary.profit} />
        </div>
        <div className="fundsgridElement">
          <Multiple data={investmentData?.investmentSummary.multiple} />
        </div>
        <div className="fundsgridElement">
          <FairValue data={investmentData?.investmentSummary.fairValue} />
        </div>
        <div className="fundsgridElement">
          <RealizedValue
            data={investmentData?.investmentSummary.realizedValue}
          />
        </div>
      </div>
    </>
  );
};
