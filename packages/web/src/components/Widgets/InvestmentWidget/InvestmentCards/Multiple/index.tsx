import React, { ReactElement } from "react";
import "../FairValue/fairValue.scss";

type MultipleCardProps = {
  data: number | undefined;
};

export const Multiple = ({ data }: MultipleCardProps): ReactElement => {
  return (
    <div className="wrapperChildWhite">
      <p className="wrapperChildWhite__title">Multiple</p>
      <h3 className="wrapperChildWhite__value">{data}</h3>
    </div>
  );
};
