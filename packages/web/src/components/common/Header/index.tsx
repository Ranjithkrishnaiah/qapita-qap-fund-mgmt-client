import React, { useContext, useEffect, useState } from "react";
import "./header.scss";
import { Row, Col, Badge, Dropdown, Menu, Button } from "antd";
import {
  CloseOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Logo from "../../../../assets/images/logo-qapita.png";
import NotificationIcon from "../../shared/icons/NotificationIcon";
import UserIcon from "../../shared/icons/UserIcon";
import { AuthService } from "../../../services/AuthService";
import { portfoliocompanies } from "../portfoliocompanies";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import axios from "axios";
import { firmProfileInterface } from "../../FirmProfileInfo/firmProfileInterface";
import { useHistory } from "react-router-dom";

let authService: AuthService;
interface HeaderProps {
  collapseTrigger: boolean;
  setCollapseTrigger: (a: boolean) => void;
  firm: firmProfileInterface | undefined;
  setFirm: (a: firmProfileInterface | undefined) => void;
}

export const Header: React.FC<HeaderProps> = ({
  collapseTrigger,
  setCollapseTrigger,
  firm,
  setFirm,
}) => {
  const onCollapseTrigger = () => setCollapseTrigger(!collapseTrigger);
  const history = useHistory();
  authService = new AuthService();
  const [firmlogo, setFirmLogo] = useState();

  //using userTokenContext
  const { slugId, getClient, setUserId } = useContext(ApplicationContext);
  const service = getClient().getHeaderService();
  const userDataService = getClient().UserDataService();

  useEffect(() => {
    service.getLogo().then((res: any) => setFirmLogo(res));

    service.getFirmName().then((res: any) => setFirm(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  const logout = () => {
    return authService.logout();
  };

  const task = () => {
    history.push(`/${slugId}/pending-task`);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={task}>My Tasks</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={logout}>
          <LogoutOutlined /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const [userName, setUserName] = useState("");

  authService.getUser().then((user) => {
    if (user?.profile?.name) {
      setUserName(user?.profile?.name);
    }
  });

  return (
    <>
      <div className="header-wrapper">
        <Row>
          <Col span={12} className="header-leftCol">
            <div className="header-leftCol-div">
              <a href="/" className="navbar-brand">
                <img src={Logo} className="qapita-logo" />
              </a>
              <RightOutlined className="logo-RightIcon" />

              <a href="/" className="navbar-brand">
                <div>
                  <img src={firmlogo} className="qapita-logo-firm" />
                  {firm?.organizationName.brandName === "" ? (
                    <span className="clientLogo-span">
                      {firm?.organizationName.legalName}
                    </span>
                  ) : (
                    <span className="clientLogo-span">
                      {firm?.organizationName.brandName}
                    </span>
                  )}
                </div>
              </a>
            </div>
          </Col>
          <Col span={12} className="header-rightCol">
            <div className="header-rightCol-div">
              <div className="user-notifications">
                <Badge count={4} className="headerBadgeIcon">
                  <NotificationIcon />
                </Badge>
                <span className="user-notificationsName">Notifications</span>
              </div>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <div className="user-profileDropdown headerBadgeIcon">
                  <UserIcon />
                  <span className="user-profileName">{userName}</span>
                  <DownOutlined />
                </div>
              </Dropdown>
              <div
                className="NavTrigger-button-mobile"
                onClick={onCollapseTrigger}
              >
                {collapseTrigger === true ? (
                  <MenuOutlined className="menuOutlinedIcon" />
                ) : (
                  <CloseOutlined className="menuCloseIcon" />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
