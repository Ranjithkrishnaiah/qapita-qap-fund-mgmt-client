import React, { ReactElement } from "react";
import "./widgetCard.scss";

type WidgetCardProps = {
  property: string;
  value: string;
  isGold?: boolean;
  inUSD?: boolean;
};

export const WidgetCard = ({
  property,
  value,
  isGold,
  inUSD,
}: WidgetCardProps): ReactElement => {
  let className = "wrapperChild";

  if (isGold) {
    className += " gold";
  }

  return (
    <div className={className}>
      <p className="wrapperChild__title">{property}</p>
      <h3 className="wrapperChild__value">
        {inUSD && <span className="wrapperChild__usd">USD</span>} {value}
      </h3>
    </div>
  );
};
