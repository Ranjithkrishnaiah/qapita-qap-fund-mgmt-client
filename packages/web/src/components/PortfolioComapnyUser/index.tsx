import { Button, Card, Divider, message, Popover } from "antd";
import React, { ReactElement, useState } from "react";
import { Breadcrumb } from "antd";
import { Funds } from "../Widgets/CompanyOverviewWidget/CompanyOverviewCards/Funds";
import { CompanyUserTop } from "./CompanyuserTop";
import { Input } from "antd";
import "./document.scss";
import TextArea from "antd/lib/input/TextArea";
import { Row, Col } from "antd";
import {
  AppstoreOutlined,
  CaretDownOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import CompanyUserIcon from "../shared/icons/CompanyUsericon";
import DownloadUserIcon from "../shared/icons/DownloadPortfolio";
import { CompanyTableHeader } from "./CommpanyHeader";
import MenuListIcon from "../shared/icons/MenuList";
import EmployeAgreementIcon from "../shared/icons/Employeeagrementicon";
import { PortCoTableHeader } from "../PortCoAssociation/ProtCoTableHeader";
import { CompaniesTableBodyListView } from "../CompaniesTable/CompaniesTableBodyListView";
import FileIcon from "../shared/icons/FileIcon";
import DocIcon from "../shared/icons/Docicon";
import FrameIcon from "../shared/icons/FrameIcon";
import Dragger from "antd/lib/upload/Dragger";
import ArrowIcon from "../shared/icons/ArrowIcon";
import GridIcon from "../shared/icons/GridIcon";
import { CompanyTableBody } from "./ComapanyTableBody";
import FolderIcon from "../shared/icons/FolderIcon";
import UploadIcon from "../shared/icons/uploadIcon";
import { NewFolderModal } from "./CompanyModal/FolderModal";
import { UploadModal } from "./CompanyModal/UploadModal/Index";
import { useParams } from "react-router";
import { useContext } from "react";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";
import { useEffect } from "react";
import { newFolderInterface } from "./CompanyModal/FolderModal/NewFolderInterface";
import { TokenContext } from "../../Context/TokenContext/TokenContextProvider";
import { uploadfileInterface } from "./CompanyModal/UploadModal/UploadFileInterface";
import { useHistory } from "react-router-dom";
import { Documents as RecentDocuments } from "@qapita/fund-admin-client/src/contracts";
import { defaultRoutesObject } from "./defaultRoutesObject";

let id: any;
let history;

type DocumentsProps = {
  routes;
  setRoutes: (a: any[]) => void;
  portCoData: any[];
  setPortCoData: (a: []) => void;
};

export const Documents: React.FC<DocumentsProps> = ({
  routes,
  setRoutes,
  portCoData,
  setPortCoData,
}) => {
  // export const Documents: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [upload, setUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectFolder, setSelectFolder] = useState<newFolderInterface>();
  const [selectSubFolder, setSelectSubFolder] = useState<newFolderInterface>();
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();
  const [compnayid, setCompanyid] = useState("");
  const { token } = useContext(TokenContext);
  const [uploadFile, setUplodFile] = useState<uploadfileInterface>();
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  id = useParams();

  history = useHistory();

  const content = (
    <div>
      <p
        className="popovertext"
        onClick={() => {
          handleNewFolder();
        }}
      >
        <span style={{ margin: "1px 13px" }}>
          <FolderIcon />
        </span>
        Make New Folder
      </p>
      <p
        className="popovertext"
        onClick={() => {
          handleUpload();
        }}
      >
        <span style={{ margin: "1px 13px" }}>
          <UploadIcon />
        </span>
        Upload File
      </p>
    </div>
  );

  const handleNewFolder = () => {
    setVisible(true);
    setOpen(false);
  };

  const handleUpload = () => {
    setUpload(true);
    setOpen(false);
  };

  const [recentFiles, setRecentFiles] = useState<RecentDocuments[]>();

  useEffect(() => {
    service.getCompanyDocuments(id.id, "/").then((response: any) => {
      setPortCoData(response.data);
    });

    service.getRecentDocuments(id.id).then((res) => {
      setRecentFiles(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, id.id, getClient]);

  const onSeletedFolder = (data) => {
    setSelectFolder(data);
  };

  const onSeletedSubFolder = (data) => {
    setSelectSubFolder(data);
  };

  const handleChnage = (values) => {
    const fileData: File = values.fileList[0].originFileObj;

    const formData: any = new FormData();
    formData.append("name", fileData.name);
    formData.append("description", "");
    formData.append("formfile", fileData);
    formData.append("folderPath", getFolderPath());

    service
      .createFolder(formData, id.id)
      .then(() => setLoadingSpinner(true))
      .then(() => message.success("File created successfully"))
      .then(() => {
        window.location.reload();
      });
  };

  function getFolderPath() {
    if (selectFolder?.folderPath && selectFolder?.name) {
      return `${selectFolder?.folderPath}${selectFolder?.name}`;
    }
    return "/";
  }

  const props = {
    beforeUpload: (file) => {
      return false;
    },
  };

  const [selectedFolderPath, setSelectedFolderPath] = useState("/");

  function getSelectedFolderPath(currentRoute) {
    let folderPath = "";
    routes.forEach((route) => {
      folderPath += `${route.path}`;
      if (route.breadcrumbName === currentRoute.breadcrumbName) {
        folderPath = folderPath.substring(1, folderPath.length);
        setSelectedFolderPath(folderPath);
        return folderPath;
      }
    });
    folderPath = folderPath.substring(1, folderPath.length);
    return folderPath;
  }

  useEffect(() => {
    if (selectFolder?.folderPath && selectFolder?.name) {
      const updatedRoute = [
        ...routes,
        {
          path: `/${selectFolder?.name}`,
          breadcrumbName: selectFolder?.name,
        },
      ];
      setRoutes(updatedRoute);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFolder]);

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <a onClick={() => updateRoutes(route)}>{route.breadcrumbName}</a>
    );
  }

  function updateRoutes(route) {
    const indexOfRoute = routes.findIndex((el) => el.path === route.path);
    const updatedRoutes: any = [];
    for (let i = 0; i <= indexOfRoute; i++) {
      updatedRoutes.push(routes[i]);
    }
    setRoutes(updatedRoutes);

    const updatedRoutePaths = updatedRoutes.map((el) => el.path);
    let result1;
    let result2;
    if (updatedRoutePaths.length != 1) {
      result1 = updatedRoutePaths.slice(1);
      result2 = result1.join("");
    } else {
      result2 = "/";
    }

    service.getCompanyDocuments(id.id, result2).then((response: any) => {
      setPortCoData(response.data);
    });
  }

  const handleVisibleChange = (open) => {
    setOpen(open);
  };

  return (
    <>
      <div className="Main">
        <div className="RecentFiles">
          <h3 className="recentHedaer">Recent Files</h3>
          <div className="CardContent">
            {recentFiles?.map((data) => {
              return (
                <CompanyUserTop
                  key={data.id}
                  time={data.modifiedOn}
                  title={data?.name}
                  value={data?.description}
                  data=""
                  file=""
                />
              );
            })}
          </div>
        </div>

        <div className="breadcrumb">
          <Breadcrumb
            separator=">"
            style={{ height: "5px" }}
            itemRender={itemRender}
            routes={routes}
          />
        </div>
        <div className="tableContent">
          <div className="tableHeader">
            <Input
              className="searchbar"
              placeholder="Search Folder, Name, Status, etc "
              prefix={<SearchOutlined />}
              // bordered={false}
            />

            <Dragger
              className="dragAndDrop"
              {...props}
              name="file"
              onChange={handleChnage}
            >
              <p className="ant-upload-hint">
                Drop files here or click to upload
              </p>
            </Dragger>

            <Popover
              onVisibleChange={handleVisibleChange}
              visible={open}
              placement="bottomRight"
              title=""
              content={content}
              trigger="click"
            >
              <Button className="AddDropDown">
                Add
                <CaretDownOutlined />
              </Button>
            </Popover>

            <div className="icons">
              <MenuListIcon />
              <span>
                <AppstoreOutlined
                  style={{ fontSize: "20px", marginTop: "-2px" }}
                />
              </span>
            </div>
          </div>

          <div className="tablePart">
            <div className="portTagsTableWrapper">
              <div className="portTagsTableWrapper__gridContainer">
                <CompanyTableHeader />
                <CompanyTableBody
                  selectedFolder={onSeletedFolder}
                  currentFolderPath={selectedFolderPath}
                  portCoData={portCoData}
                  setPortCoData={setPortCoData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewFolderModal
        visible={visible}
        setVisible={setVisible}
        compnayid={id.id}
        selectedFolderPath={getFolderPath()}
      />
      <UploadModal
        visible={upload}
        setVisible={setUpload}
        companyid={id.id}
        folderPath={getFolderPath()}
      />
    </>
  );
};
