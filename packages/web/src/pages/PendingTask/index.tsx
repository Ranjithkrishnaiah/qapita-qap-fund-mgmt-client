import React, { useContext } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { firmProfileInterface } from "../../components/FirmProfileInfo/firmProfileInterface";
import { Layout } from "antd";
import { Widgets } from "../../components/Widgets";
import { Header } from "../../components/common/Header";
import { Sidebar } from "../../components/common/Sidebar";
import { Topbar } from "../../components/common/Topbar";
import { Typography } from "antd";
import { Card, Col, Row } from "antd";
import "./pendingtask.scss";
import PendingTaskIcon from "../../components/shared/icons/PendingTaskIcon";
import DeclineIcon from "../../components/shared/icons/DeclineIcon";
import { AcceptInvitation } from "./AcceptInvitation";
import { DeclineInvitation } from "./Declineinvitation";
import { TokenContext } from "../../Context/TokenContext/TokenContextProvider";
import { companyIdInterface } from "../../components/common/PortoFolioTopbar/companyIdInterface";

const { Title } = Typography;

const { Content } = Layout;

const staticData = [
  {
    fundinvitation: "invitation to tequoia fund | ",
  },
  {
    fundinvitation: "invitation to tequoia fund || ",
  },
  {
    fundinvitation: "invitation to tequoia  sass fund || ",
  },
  {
    fundinvitation: "invitation to tequoia fund | ",
  },
  {
    fundinvitation: "invitation to tequoia fund || ",
  },
  {
    fundinvitation: "invitation to tequoia  sass fund || ",
  },
];

const Task: React.FC = (props) => {
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const { setSlugId, slugId } = useContext(ApplicationContext);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [visible, setVisible] = useState(false);
  const [declinevVsible, setDeclinevVsible] = useState(false);
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  return (
    <>
      <Layout className="main-section scrollbar">
        <Title level={2}>Your Pending Tasks</Title>
        <Content className="site-layout-background">
          <div className="site-card-wrapper">
            <Row className="taskInfoCardRow" gutter={20}>
              <>
                {staticData.map((ele, ind) => (
                  <Col span={6} key={ind}>
                    <Card className="taskInfoCard">
                      <div>
                        <p className="taskInfoHeading">Importanat</p>
                      </div>
                      <div className="fundInfoColTwo">
                        <p className="taskHeading">Fund Invitation:</p>
                      </div>
                      <div className="InfcolThree">
                        <p className="textPart">{ele.fundinvitation}</p>
                      </div>

                      <div className="InfcolFour">
                        <div className="acceptIcon">
                          <PendingTaskIcon />
                          <a
                            id="accepticon"
                            className="taskInfoAccepte"
                            onClick={() => setVisible(true)}
                          >
                            Accept invitation
                          </a>
                        </div>

                        <div>
                          <DeclineIcon />
                          <a
                            id="declineicon"
                            className="taskInfoDecline"
                            onClick={() => setDeclinevVsible(true)}
                          >
                            Decline invitation
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </>
            </Row>
          </div>
        </Content>
      </Layout>

      <AcceptInvitation visible={visible} setVisible={setVisible} />
      <DeclineInvitation
        visible={declinevVsible}
        setVisible={setDeclinevVsible}
      />
    </>
  );
};

export default Task;
