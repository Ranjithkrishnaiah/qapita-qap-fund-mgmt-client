import React, { ReactElement } from "react";
import "./firmLogoInfo.scss";
import FirmLogo from "../../../../assets/images/firmProfileLogo.png";
import { firmProfileInterface } from "../firmProfileInterface";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

type FirmLogoProps = {
  data: firmProfileInterface | undefined;
  // logo: string | undefined;
  // setLogo: (a: any) => void;
};

export const FirmLogoInfo = ({
  data,
}: // logo,
// setLogo,
FirmLogoProps): ReactElement => {
  const [logo, setLogo] = useState();
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getFirmProfileService();

  useEffect(() => {
    service.getFirmLogo().then((res: any) => setLogo(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <>
      <div className="profileDetails__imageBlock">
        <div className="imageBlock__div">
          <img src={logo} alt="companyLogo" />
          {data?.organizationName.brandName === "" ? (
            <h4>{data?.organizationName.legalName}</h4>
          ) : (
            <h4>{data?.organizationName.brandName}</h4>
          )}
          <div className="cinCodeBlock__div">
            <h5>CIN / Corporate #</h5>
            <span>{data?.incorporationDetails.corporateNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
};
