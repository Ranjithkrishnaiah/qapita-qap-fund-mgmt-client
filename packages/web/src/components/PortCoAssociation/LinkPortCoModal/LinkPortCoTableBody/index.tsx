import { Checkbox } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import AcceptedIcon from "../../../shared/icons/AcceptedIcon";
import { qmapCompaniesObject } from "../qmapCompaniesObject";
import "./linkPortCoTableBody.scss";
import { LinkPortCoTableRow } from "./LinkPortCoTableRow";

type LinkPortCoTableBodyProps = {
  setCheckAll: (a: boolean) => void;
  checkAll: boolean;
  checkedIssuerID: number;
  setcheckedIssuerID: (a: number) => void;
};

export const LinkPortCoTableBody = ({
  setCheckAll,
  checkAll,
  checkedIssuerID,
  setcheckedIssuerID,
}: LinkPortCoTableBodyProps): ReactElement => {
  const [qmapCompanies, setQmapCompanies] = useState<qmapCompaniesObject[]>();
  const [qmapIssuerId, setQmapIssuerId] = useState();

  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().PortcoAssociationService();

  useEffect(() => {
    service.getPortCoQmapCompanies().then((res: any) => setQmapCompanies(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  const dataIssuerName: any = [];
  qmapCompanies?.forEach((el) => {
    dataIssuerName.push(el.issuerName);
  });

  return (
    <>
      {qmapCompanies?.map((el, index) => {
        return (
          <LinkPortCoTableRow
            key={index}
            issuerId={el.issuerId}
            issuerName={el.issuerName}
            isSelfManaged={el.isSelfManaged}
            isLinked={el.isLinked}
            checkedIssuerID={checkedIssuerID}
            setcheckedIssuerID={setcheckedIssuerID}
          />
        );
      })}
    </>
  );
};
