import { Button } from "antd";
import axios from "axios";
import React, { ReactElement, useState } from "react";
import { CreateMetaTagsModal } from "./CreateMetaTagsModal";
import "./metaTagsInfo.scss";
import { MetaTagsTableBody } from "./MetaTagsTableBody";
import { metaTagsInterface } from "./MetaTagsTableBody/metaTagsInterface";
import { MetaTagsTableHeader } from "./MetaTagsTableHeader";

export const MetaTagsInfo = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [metaTags, setMetaTags] = useState<metaTagsInterface[]>([]);

  return (
    <>
      <div className="metaTags_Wrapper">
        <div className="metaTags_header">
          <Button
            size="large"
            className="btn_primary"
            onClick={() => setVisible(true)}
          >
            Create Meta Tags
          </Button>
          <CreateMetaTagsModal
            visible={visible}
            setVisible={setVisible}
            metaTags={metaTags}
            setMetaTags={setMetaTags}
          />
        </div>
        <div className="metaTagsTableWrapper">
          <div className="metaTagsTableWrapper__gridContainer">
            <MetaTagsTableHeader />

            <MetaTagsTableBody metaTags={metaTags} setMetaTags={setMetaTags} />
          </div>
        </div>
      </div>
    </>
  );
};
