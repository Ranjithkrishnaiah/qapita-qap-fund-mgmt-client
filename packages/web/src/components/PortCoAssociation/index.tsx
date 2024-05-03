import { Button } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { LinkPortCoModal } from "./LinkPortCoModal";
// import { CreateMetaTagsModal } from "./CreateMetaTagsModal";
import "./portcoAssociation.scss";
import { PortCoTableBody } from "./PortCoTableBody";
import { ProtCoObject } from "./PortCoTableBody/ProtCoObject";
import { PortCoTableHeader } from "./ProtCoTableHeader";

export const ProtCoAsscoiation = (): ReactElement => {
  const [visibleLinkPortCo, setVisibleLinkPortCo] = useState(false);
  const [portCoData, setPortCoData] = useState<ProtCoObject[]>([]);

  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().getSidebarService();

  useEffect(() => {
    service.getSidebarCompanies().then((res: any) => setPortCoData(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  return (
    <>
      <div className="portTags_Wrapper">
        <div className="portTags_header">
          <Button
            size="large"
            className="btn_primary"
            onClick={() => setVisibleLinkPortCo(true)}
          >
            Link PortCo
          </Button>
          {/* <CreateMetaTagsModal visible={visible} setVisible={setVisible} /> */}
        </div>
        <div className="portTagsTableWrapper">
          <div className="portTagsTableWrapper__gridContainer">
            <PortCoTableHeader />

            <PortCoTableBody
              portCoData={portCoData}
              setPortCoData={setPortCoData}
            />
          </div>
        </div>
      </div>

      <LinkPortCoModal
        visibleLinkPortCo={visibleLinkPortCo}
        setVisibleLinkPortCo={setVisibleLinkPortCo}
        portCoData={portCoData}
        setPortCoData={setPortCoData}
      />
    </>
  );
};
