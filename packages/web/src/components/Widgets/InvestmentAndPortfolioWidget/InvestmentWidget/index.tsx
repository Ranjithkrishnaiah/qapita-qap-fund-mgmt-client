import React, { ReactElement } from "react";
import data from "../../userData.json";
import { WidgetCard } from "../../CompanyOverviewWidget/WidgetCards/WidgetCard";
import "./investmentWidget.scss";

export const InvestmentWidget = (): ReactElement => {
  return (
    <div className="investmentContainer">
      <div className="titleWrapper">
        <h3>Investments</h3>
        <p>Icon</p>
      </div>
      <div className="cardsWrapper">
        {data.investments.map((el) => (
          <WidgetCard key={el.id} value={el.value} property={el.property} />
        ))}
      </div>
    </div>
  );
};
