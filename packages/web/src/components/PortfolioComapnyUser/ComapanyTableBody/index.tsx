import {
  CheckCircleTwoTone,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Card, Tag } from "antd";
import React, { useState } from "react";
import Img from "../../../../assets/images/tomato.svg";
import { Popover, Button } from "antd";
import "./companyTableBody.scss";
import PortCoAssociationIcon from "../../shared/icons/PortCoAssociationIcon";
//   import { EditPortCoModal } from "./EditPortCoModal";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { useEffect } from "react";
import { EditPortCoModal } from "../../PortCoAssociation/PortCoTableBody/EditPortCoModal";
import FileIcon from "../../shared/icons/FileIcon";
import DocumentsIcon from "../../shared/icons/DocumentsIcon";
import FileManagerIcon from "../../shared/icons/FileManagerIcon";
import { EditPortfolioModal } from "./EditPortfolioModal";
import EditIcon from "../../shared/icons/editicon";
import ShareIcon2 from "../../shared/icons/Shareicon2";
import DownloadIcon2 from "../../shared/icons/downloadicone2";
import TrashIcon from "../../shared/icons/TrashIcon";
import { useParams } from "react-router";
import { newFolderInterface } from "../CompanyModal/FolderModal/NewFolderInterface";
import { DeletePortfolioModal } from "./DeleteFolioModal";
import Moment from "react-moment";
import { DownloadContent } from "@qapita/fund-admin-client/src/contracts";
import PdfIcon from "../../shared/icons/PdfIcon";
import { MoreDocsPopover } from "./MoreDocsPopover";
// import { setTimeout } from "timers";

let id: any;

type CompanyTableBodyType = {
  selectedFolder: (data: newFolderInterface) => void;
  currentFolderPath: string;
  portCoData: any[];
  setPortCoData: (a: []) => void;
};

export interface EditInterface {
  name: string | undefined;
  description: string | undefined;
  folderPath: string | undefined;
  id: string | undefined;
}

export const CompanyTableBody: React.FC<CompanyTableBodyType> = ({
  selectedFolder,
  currentFolderPath,
  portCoData,
  setPortCoData,
}) => {
  const [visible, setVisible] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState(false);

  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().PortfolioCompanyUserSerice();
  const [selectedFolderPath, setSelectedFolderPath] =
    useState(currentFolderPath);
  const [documentid, setDocumentId] = useState<EditInterface>();

  id = useParams();

  useEffect(() => {
    if (id.id != "") {
      service
        .getCompanyDocuments(id.id, selectedFolderPath)
        .then((response: any) => {
          setPortCoData(response.data);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, id.id, currentFolderPath, selectedFolderPath, getClient]);

  function downloadDocument() {
    if (documentid?.id) {
      service
        .downloadDocuments(id.id, documentid?.id)
        .then((response: DownloadContent) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", response.fileName);
          document.body.appendChild(link);
          link.click();
        });
    }
  }

  const content = (
    <div className="content">
      <p className="edittext" onClick={() => setVisible(true)}>
        <span style={{ margin: "1px 13px" }}>
          <EditIcon />
        </span>
        Edit
      </p>
      <p className="edittext">
        <span style={{ margin: "1px 13px" }}>
          <ShareIcon2 />
        </span>
        Share
      </p>
      <p className="edittext" onClick={downloadDocument}>
        <span style={{ margin: "1px 13px" }}>
          <DownloadIcon2 />
        </span>
        Download
      </p>
      <p className="edittext" onClick={() => setDeleteFolder(true)}>
        <span style={{ margin: "1px 13px" }}>
          <TrashIcon />
        </span>
        Delete
      </p>
    </div>
  );

  function NavigateToSelectedFolder(item) {
    if (item.documentType == "File") {
      return;
    }
    selectedFolder(item);
    setSelectedFolderPath(`${item.folderPath}${item.name}/`);

    service
      .getCompanyDocuments(id.id, `${item.folderPath}${item.name}/`)
      .then((response: any) => {
        setPortCoData(response.data);
      });
  }

  return (
    <>
      {portCoData.map((item: any, ind) => {
        return (
          <div
            className="CompanyTableBody gridContainer companyTableBody"
            key={ind}
          >
            <div className="gridItem">
              <div className="fileIconClass">
                <span className="fileicon">
                  {item.name
                    .slice(item.name.lastIndexOf("."))
                    .match(/jpg|jpeg.*/) && "jpg"}
                  {item.name.slice(item.name.lastIndexOf(".")).match(/png.*/) &&
                    "png"}
                  {item.name
                    .slice(item.name.lastIndexOf("."))
                    .match(/xls|xlsx.*/) && "xlsx"}
                  {item.name
                    .slice(item.name.lastIndexOf("."))
                    .match(/pdf.*/) && <PdfIcon />}
                  {item.name
                    .slice(item.name.lastIndexOf("."))
                    .match(/doc|docx.*/) && "word"}
                  {item.name.slice(item.name.lastIndexOf(".")).includes(".") ? (
                    ""
                  ) : (
                    <FileManagerIcon />
                  )}
                </span>
              </div>
              <h4
                className="documentName"
                onClick={() => NavigateToSelectedFolder(item)}
              >
                {item?.name}
              </h4>
            </div>
            <div className="gridItem">
              <h4>{item?.description}</h4>
            </div>
            <div className="gridItem">
              <div style={{ width: "100%" }}>
                <h4>
                  <Moment format="MMM DD, YYYY HH:MM">
                    {item?.modifiedOn}
                  </Moment>
                </h4>
                <br />
                <span>{item.text}</span>
              </div>
            </div>
            <div className="gridItem">
              <h4>{item.person}</h4>
            </div>
            <div className="gridItem ">
              {/* <MoreDocsPopover
                item={item}
                documentid={documentid}
                setDocumentId={setDocumentId}
              /> */}
              <Popover
                className="companyName"
                placement="bottomRight"
                title={item?.name}
                content={content}
                trigger="click"
              >
                <MoreOutlined onClick={() => setDocumentId(item)} />
              </Popover>
            </div>
          </div>
        );
      })}
      {visible && (
        <EditPortfolioModal
          visible={visible}
          setVisible={setVisible}
          documentId={documentid}
          companyId={id.id}
        />
      )}
      {deleteFolder && (
        <DeletePortfolioModal
          visible={deleteFolder}
          setVisible={setDeleteFolder}
          documentId={documentid}
          companyId={id.id}
        />
      )}
    </>
  );
};
