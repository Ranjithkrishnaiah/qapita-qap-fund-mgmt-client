import CaptableIcon from "../../shared/icons/CaptableIcon";
import DashboardIcon from "../../shared/icons/DashboardIcon";
import DocumentsIcon from "../../shared/icons/DocumentsIcon";
import InvestementsIcon from "../../shared/icons/InvestementsIcon";
import PerformanceIcon from "../../shared/icons/PerformanceIcon";
import ReportsIcon from "../../shared/icons/ReportsIcon";
import RuralCompanyIcon from "../../shared/icons/RuralCompanyIcon";
import ScenarioIcon from "../../shared/icons/ScenarioIcon";
import SettingsIcon from "../../shared/icons/SettingsIcon";
import TequoiaFundI from "../../shared/icons/TequoiaFundI";
import TransactionsIcon from "../../shared/icons/TransactionsIcon";
import UserIcon from "../../shared/icons/UserIcon";

export const navigationItems = [
  {
    id: "1",
    menuHeadline: "Investment Firm",
    subMenuArray: [
      {
        id: "sub1",
        subMenuTitle: "",
        subMenus: [
          {
            id: "111",
            menuTitle: "Dashboard",
            menuIcon: DashboardIcon,
          },
          {
            id: "112",
            menuTitle: "Investments",
            menuIcon: InvestementsIcon,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    menuHeadline: "Fund",
    subMenuArray: [
      {
        id: "sub2",
        subMenuTitle: "Tequoia Fund I",
        menuIcon: TequoiaFundI,
        subMenus: [
          {
            id: "211",
            menuTitle: "Dashboard",
            menuIcon: DashboardIcon,
          },
          {
            id: "212",
            menuTitle: "Peformance",
            menuIcon: PerformanceIcon,
          },
          {
            id: "213",
            menuTitle: "Reports",
            menuIcon: ReportsIcon,
          },
          {
            id: "214",
            menuTitle: "Fund Settings",
            menuIcon: SettingsIcon,
          },
        ],
      },
      {
        id: "sub3",
        subMenuTitle: "Tequoia Fund II",
        menuIcon: TequoiaFundI,
        subMenus: [
          {
            id: "221",
            menuTitle: "Dashboard",
            menuIcon: DashboardIcon,
          },
          {
            id: "222",
            menuTitle: "Peformance",
            menuIcon: PerformanceIcon,
          },
        ],
      },
      {
        id: "sub4",
        subMenuTitle: "Tequoia SaaS Fund",
        menuIcon: TequoiaFundI,
        subMenus: [
          {
            id: "233",
            menuTitle: "Reports",
            menuIcon: ReportsIcon,
          },
          {
            id: "234",
            menuTitle: "Fund Settings",
            menuIcon: SettingsIcon,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    menuHeadline: "Portfolio Company",
    subMenuArray: [
      {
        id: "sub5",
        subMenuTitle: "Rural",
        menuIcon: RuralCompanyIcon,
        subMenus: [
          {
            id: "311",
            menuTitle: "Dashboard",
            menuIcon: DashboardIcon,
          },
          {
            id: "312",
            menuTitle: "Captable",
            menuIcon: CaptableIcon,
          },
          {
            id: "313",
            menuTitle: "Transactions",
            menuIcon: TransactionsIcon,
          },
          {
            id: "314",
            menuTitle: "Scenario",
            menuIcon: ScenarioIcon,
          },
          {
            id: "315",
            menuTitle: "Documents",
            menuIcon: DocumentsIcon,
          },
        ],
      },
      {
        id: "sub6",
        subMenuTitle: "Tomato",
        menuIcon: RuralCompanyIcon,
        subMenus: [
          {
            id: "321",
            menuTitle: "Dashboard",
            menuIcon: DashboardIcon,
          },
          {
            id: "322",
            menuTitle: "Peformance",
            menuIcon: PerformanceIcon,
          },
        ],
      },
      {
        id: "sub7",
        subMenuTitle: "Charge Me",
        menuIcon: RuralCompanyIcon,
        subMenus: [
          {
            id: "333",
            menuTitle: "Reports",
            menuIcon: ReportsIcon,
          },
          {
            id: "334",
            menuTitle: "Fund Settings",
            menuIcon: SettingsIcon,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    menuHeadline: "Management",
    subMenuArray: [
      {
        id: "sub8",
        subMenuTitle: "",
        menuIcon: RuralCompanyIcon,
        subMenus: [
          {
            id: "411",
            menuTitle: "Manage Funds",
            menuIcon: RuralCompanyIcon,
          },
          {
            id: "412",
            menuTitle: "People and Roles",
            menuIcon: RuralCompanyIcon,
          },
        ],
      },
    ],
  },
];
