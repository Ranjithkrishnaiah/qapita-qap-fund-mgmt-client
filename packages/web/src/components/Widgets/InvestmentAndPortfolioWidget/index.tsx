import React from "react";
import { InvestmentWidget } from "./InvestmentWidget";
import "./middleWidget.scss";

export const InvestmentAndPortfolioWidget = (): React.ReactElement => {
  return (
    <div className="middleWidgetWrapper">
      <div className="investmentWrapper">
        <InvestmentWidget />
      </div>
      <div className="investmentWrapper">
        <InvestmentWidget />
      </div>
    </div>
  );
};
