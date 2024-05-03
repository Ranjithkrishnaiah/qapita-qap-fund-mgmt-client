import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Popover, Tag } from "antd";
import axios from "axios";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../../../Context/TokenContext/TokenContextProvider";
import { DeleteMetaTagsModal } from "./DeleteMetaTagsModal";
import { EditMetaTagsModal } from "./EditMetaTagsModal";
import { metaTagsInterface } from "./metaTagsInterface";
import "./metaTagsTableBody.scss";
import { MetaTagsValues } from "./MetaTagsValues";

type metaTagsInfoProps = {
  metaTags: metaTagsInterface[];
  setMetaTags: (a: metaTagsInterface[]) => void;
};

export const MetaTagsTableBody = ({
  metaTags,
  setMetaTags,
}: metaTagsInfoProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [metaTagId, setMetaTagId] = useState("");

  const menu = (
    <Menu className="metaTags_popMenu">
      <Menu.Item>
        <a onClick={() => setVisible(true)}>Edit Meta Tag</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => setVisibleDelete(true)}>Delete Meta Tag</a>
      </Menu.Item>
    </Menu>
  );

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getMetaTagsInfoService();

  useEffect(() => {
    service.getMetaTagsInfo().then((res: any) => setMetaTags(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  return (
    <>
      {metaTags.map((item, index) => {
        return (
          <div className="MetaTagsTableBody gridContainer" key={index}>
            <div className="gridItem">
              <h4>{item.name}</h4>
              <p className="metaTagLabel">Meta Tag</p>
            </div>
            <div className="gridItem">
              <div className="tagValues__block">
                <MetaTagsValues data={item.values} dataId={item.id} />
                <p className="metaTagLabel">Values</p>
              </div>
            </div>
            <div className="gridItem text-right">
              <div className="editMetatags">
                <Dropdown
                  overlay={menu}
                  placement="bottomLeft"
                  arrow
                  trigger={["click"]}
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreOutlined
                      onClick={() => {
                        setMetaTagId(item.id);
                      }}
                    />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        );
      })}
      <EditMetaTagsModal
        visible={visible}
        setVisible={setVisible}
        metaTagId={metaTagId}
        metaTags={metaTags}
        setMetaTags={setMetaTags}
      />

      <DeleteMetaTagsModal
        visibleDelete={visibleDelete}
        setVisibleDelete={setVisibleDelete}
        metaTagId={metaTagId}
        metaTags={metaTags}
        setMetaTags={setMetaTags}
      />
    </>
  );
};
