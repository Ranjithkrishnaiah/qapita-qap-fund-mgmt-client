import { PlusOutlined } from "@ant-design/icons";
import { Input, message, Popconfirm, Tag, Tooltip } from "antd";
import axios from "axios";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  ReactElement,
} from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../../../../Context/TokenContext/TokenContextProvider";
import "./metaTagsValues.scss";

type MetaTagsValuesProps = {
  data: string[];
  dataId: string;
};

export const MetaTagsValues = ({
  data,
  dataId,
}: MetaTagsValuesProps): ReactElement => {
  const initialTagsState = {
    tags: data,
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  };

  const [tagsValues, setTagsValues] = useState(initialTagsState);

  useEffect(() => {
    setTagsValues({ ...tagsValues, tags: data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().getMetaTagsInfoService();

  useEffect(() => {
    service.getMetaTagsInfoId(dataId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, dataId, getClient]);

  const handleClose = (removedTag) => {
    const tags = tagsValues.tags.filter((tag) => tag !== removedTag);
    setTagsValues({ ...tagsValues, tags });

    service.deleteMetaTagsValues(dataId, removedTag);

    message.success("Meta Tag Value deleted successfully");
  };

  const showInput = () => {
    setTagsValues({ ...tagsValues, inputVisible: true });
  };

  const handleInputChange = (e) => {
    setTagsValues({ ...tagsValues, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = tagsValues;
    let { tags } = tagsValues;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setTagsValues({ ...tagsValues, tags, inputVisible: false, inputValue: "" });

    if (inputValue != "") {
      service
        .postMetaTagsValues(dataId, [...tags, inputValue])
        .then((res: any) =>
          message.success("Meta Tag Value added successfully")
        );
    }
  };

  return (
    <>
      {tagsValues.tags.map((tag, index) => {
        const isLongTag = tag.length > 100;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setTagsValues({
                    ...tagsValues,
                    editInputIndex: index,
                    editInputValue: tag,
                  });
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 100)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {tagsValues.inputVisible && (
        <Input
          autoFocus
          type="text"
          size="small"
          className="tag-input"
          value={tagsValues.inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!tagsValues.inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined />
        </Tag>
      )}
    </>
  );
};
