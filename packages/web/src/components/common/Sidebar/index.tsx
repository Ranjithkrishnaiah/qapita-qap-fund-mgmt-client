import React, { useEffect, useState, useContext } from "react";
import "./sidebar.scss";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Alert, Layout, Menu } from "antd";
import MenuFoldedIcon from "../../shared/icons/MenuFoldedIcon";
import MenuUnFoldedIcon from "../../shared/icons/MenuUnFoldedIcon";
import { useHistory } from "react-router-dom";
import { FundMenuTitle } from "./FundMenuTitle";
import { InvestmentFirmMenuTitle } from "./InvestmentFirmMenuTitle";
import { ManagementMenuTitle } from "./ManagementMenuTitle";
import { ProtCoMenuTitle } from "./ProtCoMenuTitle";
import DashboardIcon from "../../shared/icons/DashboardIcon";
import CaptableIcon from "../../shared/icons/CaptableIcon";
import TransactionsIcon from "../../shared/icons/TransactionsIcon";
import DocumentsIcon from "../../shared/icons/DocumentsIcon";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { AddFundModal } from "../../Widgets/FundsWidget/AddFundModal";
import { addFundInterface } from "../../Widgets/FundsWidget/AddFundModal/AddFundModalInterface";
import { useParams } from "react-router";
import { companyIdInterface } from "../PortoFolioTopbar/companyIdInterface";
import { defaultRoutesObject } from "../../PortfolioComapnyUser/defaultRoutesObject";

const { SubMenu } = Menu;
const { Sider } = Layout;

let id: any;

interface SidebarProps {
  collapseTrigger: boolean;
  setCollapseTrigger: (a: boolean) => void;
  companyName: companyIdInterface | undefined;
  setCompanyName: (a: companyIdInterface | undefined) => void;
  routes?;
  setRoutes: (a: any[]) => void;
  portCoData: any[];
  setPortCoData: (a: []) => void;
}

let getSlug: any;
let getslugid: any;

const INVESTMENT_FIRM = [
  {
    id: "I1",
    menuName: "dashboard",
  },
  {
    id: "I2",
    menuName: "investments",
  },
];

const MANAGEMENT_DATA = [
  {
    id: "M1",
    menuName: "Add Funds",
  },
  {
    id: "M2",
    menuName: "firm-profile",
  },
  {
    id: "M3",
    menuName: "meta-tags",
  },
  {
    id: "M4",
    menuName: "portCo",
  },
];

const USERS_DATA = [
  {
    id: "U1",
    menuName: "Users",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  collapseTrigger,
  setCollapseTrigger,
  companyName,
  setCompanyName,
  routes,
  setRoutes,
  portCoData,
  setPortCoData,
}) => {
  // type for funds
  type FundObject = {
    id: string;
    name: { brandName: string; legalName: string };
  };

  // type for portfolio-companies
  type ProtCoObject = {
    id: string;
    qMapIssuerId: number;
    legalName: string;
    linkStatus: string;
  };

  const [visible, setVisible] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState("");
  const history = useHistory();
  const [fundsData, setFundsData] = useState<FundObject[]>();
  const [protCoData, setProtCoData] = useState<ProtCoObject[]>();
  const [fund, setFund] = useState<addFundInterface | undefined>();
  const [compnayId, setCompanyId] = useState("");

  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getSidebarService();
  const servicePortCoCompany = getClient().PortfolioCompanyUserSerice();
  id = useParams();

  const updateWidth = () => {
    const innerWidth = window.innerWidth;
    setWidth(innerWidth);
  };

  const CustomTrigger = () => (
    <div className="NavTrigger-button">
      <span className="menuFoldedIcon">
        <MenuFoldedIcon />
      </span>
      <span className="menuUnFoldedIcon">
        <MenuUnFoldedIcon />
      </span>
    </div>
  );

  const onCollapseTrigger = () => setCollapseTrigger(!collapseTrigger);

  function handleClick(e: any) {
    setCurrent(e.key);

    const routeSidebar = "/";
    const idPortCo = location.pathname.split("/")[2];
    servicePortCoCompany
      .getCompanyDocuments(idPortCo, routeSidebar)
      .then((response: any) => {
        setPortCoData(response.data);
      });

    setRoutes([
      {
        path: "/",
        breadcrumbName: "Home",
      },
    ]);
  }

  function MenuIconHandler(e: any) {
    return <e.menuIcon />;
  }

  useEffect(() => {
    setCompanyId(location.pathname.split("/")[2]);
    service.getSidebarFunds().then((res: any) => setFundsData(res));

    service.getSidebarCompanies().then((res: any) => setProtCoData(res));

    setTimeout(() => {
      for (let i = 0; i < INVESTMENT_FIRM.length; i++) {
        const element = INVESTMENT_FIRM[i];
        if (element.menuName === location.pathname.split("/")[2]) {
          setCurrent(element.id);
        }
      }

      for (let i = 0; i < MANAGEMENT_DATA.length; i++) {
        const element = MANAGEMENT_DATA[i];
        if (element.menuName === location.pathname.split("/")[2]) {
          setCurrent(element.id);
        }
      }
    }, 0);

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  const url = window.location.pathname.split("/")[1];

  return (
    <>
      <Sider
        // trigger={<CustomTrigger />}
        trigger={null}
        collapsible
        collapsed={collapseTrigger}
        onCollapse={onCollapseTrigger}
        breakpoint="md"
        collapsedWidth={width <= 768 ? 0 : 70}
        width={240}
        className="site-layout-background scrollbar"
      >
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          selectedKeys={[current]}
          defaultSelectedKeys={[current]}
          defaultOpenKeys={[current]}
          onClick={handleClick}
          className="sidemenu-wrapper"
          triggerSubMenuAction="click"
        >
          <>
            <InvestmentFirmMenuTitle />

            {INVESTMENT_FIRM.map((i) => {
              return (
                <Menu.Item className="firm-menu" key={i.id}>
                  <NavLink to={`/${url}/${i.menuName}`}>{i.menuName}</NavLink>
                </Menu.Item>
              );
            })}

            <FundMenuTitle />

            {fundsData?.map((e: any) => {
              return (
                <SubMenu
                  className="submenu-wrapper fund-submenu"
                  key={e.name.brandName || e.name.legalName}
                  title={
                    e.name.brandName === "" ? (
                      <span>{e.name.legalname}</span>
                    ) : (
                      <span>{e.name.brandName}</span>
                    )
                  }
                >
                  <Menu.Item
                    className="firm-menu"
                    key={e.name.brandName + 3 || e.name.legalName + 3}
                    icon={<DashboardIcon />}
                  >
                    <NavLink to={`/${url}/fund-dashboard`}>Dashboard</NavLink>
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.name.brandName + 4 || e.name.legalName + 4}
                    icon={<CaptableIcon />}
                  >
                    <NavLink to={`/${url}/fund-performance`}>
                      Peformance
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.name.brandName + 5 || e.name.legalName + 5}
                    icon={<TransactionsIcon />}
                  >
                    Reports
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.name.brandName + 6 || e.name.legalName + 6}
                    icon={<DocumentsIcon />}
                  >
                    Fund Settings
                  </Menu.Item>
                </SubMenu>
              );
            })}

            <ProtCoMenuTitle />

            {protCoData?.map((e: any) => {
              return (
                <SubMenu
                  className="submenu-wrapper fund-submenu"
                  key={e.legalName}
                  title={<span>{e.legalName}</span>}
                >
                  <Menu.Item
                    className="firm-menu"
                    key={e.legalName + 7}
                    icon={<DashboardIcon />}
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.legalName + 8}
                    icon={<CaptableIcon />}
                  >
                    Captable
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.legalName + 9}
                    icon={<TransactionsIcon />}
                  >
                    <NavLink to={`/${url}/${e.id}/transactions`}>
                      Transactions
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    className="firm-menu"
                    key={e.legalName + 10}
                    icon={<DocumentsIcon />}
                    // onClick={companysID}
                  >
                    <NavLink to={`/${url}/${e.id}/documents`}>
                      Documents
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              );
            })}

            <ManagementMenuTitle />

            {MANAGEMENT_DATA.map((i) => {
              return (
                <Menu.Item className="firm-menu" key={i.id}>
                  {i.menuName === "Add Funds" ? (
                    <>
                      <div onClick={() => setVisible(true)}>{i.menuName}</div>
                      <AddFundModal
                        visible={visible}
                        setVisible={setVisible}
                        fund={fund}
                        setFund={setFund}
                      />
                    </>
                  ) : (
                    <NavLink to={`/${url}/${i.menuName}`}>{i.menuName}</NavLink>
                  )}
                </Menu.Item>
              );
            })}

            {USERS_DATA.map((i) => {
              return (
                <SubMenu
                  className="submenu-wrapper fund-submenu users-submenu"
                  key={i.id}
                  title={i.menuName}
                >
                  <Menu.Item className="firm-menu" key="U2">
                    <NavLink to={`/${url}/user/manage`}>Manage Users</NavLink>
                  </Menu.Item>
                  {/* <Menu.Item className="firm-menu" key="U3">
                    <NavLink to={`/${url}/roles/manage`}>Manage Roles</NavLink>
                  </Menu.Item> */}
                </SubMenu>
              );
            })}
          </>
        </Menu>
      </Sider>
    </>
  );
};
