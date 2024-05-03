import React, { ReactElement } from "react";
import "./companyLogoCard.scss";

type CompanyLogoCardProps = {
  property: string;
  value: string;
};

export const CompanyLogoCard = ({
  property,
  value,
}: CompanyLogoCardProps): ReactElement => {
  return (
    <div className="logoWrapper">
      <div className="imgWrapper">
        <img src={value} />
      </div>
      <h3>{property}</h3>
    </div>
  );
};
