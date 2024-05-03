import { EditOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import "./firmProfileInfo.scss";
import { FirmLogoInfo } from "./FirmLogoInfo";
import { FirmBasicInfo } from "./FirmBasicInfo";
import { FirmContactInfo } from "./FirmContactInfo";
import { firmProfileInterface } from "./firmProfileInterface";
import { FirmProfileFormModal } from "./FirmProfileFormModal";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";

export const FirmProfileInfo: React.FC = () => {
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [visible, setVisible] = useState(false);
  const [logo, setLogo] = useState();

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getFirmProfileService();

  useEffect(() => {
    service.getFirmProfile().then((res: any) => setFirm(res));

    service.getFirmLogo().then((res: any) => setLogo(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <>
      <div className="FirmProfileInfo">
        <div className="FirmProfileInfo__editIcon">
          <EditOutlined onClick={() => setVisible(true)} />
          <FirmProfileFormModal visible={visible} setVisible={setVisible} />
        </div>
        <div className="FirmProfileInfo__profileDetails">
          <FirmLogoInfo data={firm} />

          <div className="profileDetails__infoBlock">
            <div className="infoBlock__basicInfo">
              <h5>Basic info</h5>
              <FirmBasicInfo data={firm} />
            </div>
            <div className="infoBlock__basicInfo infoBlock__contactInfo">
              <h5>Contact info</h5>
              <FirmContactInfo data={firm} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
