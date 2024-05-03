import { MoreOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popover, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React, { ReactElement, useState } from "react";
import { EditInterface } from "..";

type MoreDocsPopoverProps = {
  item;
  documentid: EditInterface | undefined;
  setDocumentId: (a: EditInterface) => void;
};

export const MoreDocsPopover = ({
  item,
  documentid,
  setDocumentId,
}: MoreDocsPopoverProps): ReactElement => {
  const [visibleDocPopover, setVisibleDocPopover] = useState(false);

  const content = <div className="content">hello</div>;

  const handleVisibleDocPopover = (visibleDocPopover) => {
    setVisibleDocPopover(visibleDocPopover);
  };

  return (
    <>
      <Popover
        onVisibleChange={handleVisibleDocPopover}
        visible={visibleDocPopover}
        className="companyName"
        placement="bottomRight"
        title={item?.name}
        content={content}
        trigger="click"
      >
        <MoreOutlined onClick={() => setDocumentId(item)} />
      </Popover>
    </>
  );
};
