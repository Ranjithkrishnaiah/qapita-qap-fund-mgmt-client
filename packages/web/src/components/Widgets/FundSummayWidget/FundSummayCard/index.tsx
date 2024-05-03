import { Progress } from "antd";
import React, { ReactElement } from "react";
import "./fundSummayCard.scss";

type FundSummayWidgetProps = {
  data: {
    totalCapital: string;
    fundsDeployed: string;
    fundsDeployedPercentage: string;
    unUtilized: string;
    unUtilizedPercentage: string;
  };
};

export const FundSummayCard = ({
  data,
}: FundSummayWidgetProps): ReactElement => {
  return (
    <>
      <div className="fundSummaryCardBlock">
        <div className="fundSummaryTopBlock">
          <div className="fundSummaryTitle">
            <h4>
              {location.pathname.split("/")[2] === "investments"
                ? "Deployment"
                : "Fund"}{" "}
              Summary
            </h4>
          </div>
          <div className="fundSummaryIndicators">
            <div className="fundSummaryIndicatorsDiv">
              <div></div>
              <span>Funds Deployed</span>
            </div>
            <div className="fundSummaryIndicatorsDiv">
              <div></div>
              <span>Unutilized</span>
            </div>
          </div>
        </div>
        <div className="fundSummarySize">
          <h6>Total Capital</h6>
          <h4>
            <span>USD</span> {data.totalCapital}
          </h4>
        </div>
        <div className="fundSummaryProgressBar">
          <Progress percent={75} showInfo={false} />
        </div>
        <div className="fundSummaryResults">
          <div className="fundSummaryResultsDiv">
            <h4>
              <span>USD</span>
              {data.fundsDeployed}
            </h4>
            <h6>({data.fundsDeployedPercentage}%)</h6>
          </div>
          <div className="fundSummaryResultsDiv">
            <h4>
              <span>USD</span>
              {data.unUtilized}
            </h4>
            <h6>({data.unUtilizedPercentage}%)</h6>
          </div>
        </div>
      </div>
    </>
  );
};
