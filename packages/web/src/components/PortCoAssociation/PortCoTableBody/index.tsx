import {
  CheckCircleTwoTone,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import React, { ReactElement, useState } from "react";
import Img from "../../../../assets/images/tomato.svg";
import { Popover, Button } from "antd";
import "./portcoTableBody.scss";
import PortCoAssociationIcon from "../../shared/icons/PortCoAssociationIcon";
import { EditPortCoModal } from "./EditPortCoModal";
import { useContext } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { useEffect } from "react";
import { ProtCoObject } from "./ProtCoObject";

type PortCoTableBodyProps = {
  portCoData: ProtCoObject[];
  setPortCoData: (a: ProtCoObject[]) => void;
};

export const PortCoTableBody = ({
  portCoData,
  setPortCoData,
}: PortCoTableBodyProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: "" });
  const Content = ({ item }) => (
    <div className="content">
      <p>Send Reminder </p>
      <p>Send Request</p>
      <p>Delete Invitation</p>
      <p onClick={() => setVisible(true)}>Assign Meta Tags</p>
    </div>
  );

  return (
    <>
      {portCoData.map((item: any, ind) => {
        return (
          <div
            className="PortTagsTableBody gridContainer portTagsTableBody"
            key={ind}
          >
            <div className="gridItem proctoImgBlock">
              <h4>{item.legalName}</h4>
            </div>
            <div className="gridItem">
              <div className="tagValues__block">
                <PortCoAssociationIcon />
              </div>
            </div>
            <div>
              <div>
                <h4>Unassigned</h4>
              </div>
            </div>
            <div className="gridItem text-right">
              <div className="editPortco">
                <Popover
                  className="companyName"
                  placement="bottomRight"
                  title={item.company}
                  content={<Content item={item} />}
                  trigger="click"
                >
                  <MoreOutlined
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                  />
                </Popover>
              </div>
            </div>
          </div>
        );
      })}
      {visible && (
        <EditPortCoModal
          visible={visible}
          setVisible={setVisible}
          item={selectedItem}
        />
      )}
    </>
  );
};
