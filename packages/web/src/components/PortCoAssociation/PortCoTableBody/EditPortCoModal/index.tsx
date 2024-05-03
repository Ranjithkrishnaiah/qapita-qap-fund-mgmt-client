import { Button, Form, Input, message, Modal, Select } from "antd";

import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
// import { metaTagsInterface } from "../metaTagsInterface";
// import "./editMetaTagsModal.scss";
// import { metaTagsEditInterface } from "./metaTagsEditInterface";

type EditPortCoModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  item: any;
};

export const EditPortCoModal = ({
  visible,
  setVisible,
  item,
}: EditPortCoModalProps): ReactElement => {
  const onCancel = () => {
    setVisible(false);
  };
  const [formState, setFormState] = useState<any[]>([]);

  const [form] = Form.useForm();

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  //using userTokenContext
  const { slugId, getClient } = useContext(ApplicationContext);
  const service = getClient().PortcoAssociationService();

  useEffect(() => {
    service.getPortCoMetaTags(item.id).then((res: any) => {
      setFormState(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);
  const updateMetaTagsInfo = () => {
    const body = formState
      .map((item) => {
        if (form.getFieldValue(item.metaTagId)) {
          return {
            metaTagId: item.metaTagId,
            values: [form.getFieldValue(item.metaTagId)],
          };
        }
      })
      .filter((values) => values);
    service.putPortCoMetaTags(item.id, body).then((res: any) => {
      message.success("Meta tags assigned successfully");
      onCancel();
    });
  };
  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title="Assign Meta Tags"
        centered
        footer={[
          <Button
            key="cancel"
            className="firmProfileCancelBtn"
            onClick={onCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="sendInviteBtn firmProfileUpdateBtn"
            onClick={updateMetaTagsInfo}
            loading={loadingSpinner}
          >
            {loadingSpinner === false ? "Submit" : "Please Wait"}
          </Button>,
        ]}
        className="newStyle popupModalClass createMetaTagsModal"
      >
        <Form
          form={form}
          layout="vertical"
          className="firmProfileForm createMetaTagsForm"
          //   onValuesChange={onValuesChange}
        >
          <div className="createMetaTags__block">
            {/* Business Type */}
            {formState.map((item) => (
              <Form.Item
                name={item.metaTagId}
                label={item.metaTagName}
                key={item.metaTagId}
                initialValue={item.selectedValues[0]}
              >
                <Select
                  placeholder={item.metaTagName}
                  bordered={false}
                  className="firmProfileInputField"
                >
                  {item.values.map((elem) => (
                    <Select.Option name={elem} value={elem} key={elem}>
                      {elem}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ))}
            {/* <Form.Item name="business" label="Business Type">
              <Select
                placeholder="B2B"
                bordered={false}
                className="firmProfileInputField"
              >
                <Select.Option name="b2b" value="B2B">
                  B2B
                </Select.Option>
                <Select.Option name="b2c" value="B2C">
                  B2C
                </Select.Option>
              </Select>
            </Form.Item> */}

            {/* Industry*/}

            {/* <Form.Item
              name="industry"
              label="Industry"
              initialValue="Print Media"
            >
              <Select
                placeholder="Print Media"
                bordered={false}
                className="firmProfileInputField"
              >
                <Select.Option name="printMedia" value="printMedia">
                  Print Media
                </Select.Option>
              </Select>
            </Form.Item> */}

            {/* Sector*/}

            {/* <Form.Item name="sector" label="Sector" initialValue="Retail">
              <Select
                placeholder="Retail"
                bordered={false}
                className="firmProfileInputField"
              >
                <Select.Option name="retail" value="retail">
                  Retail
                </Select.Option>
              </Select>
            </Form.Item> */}

            {/* Investment Year*/}

            {/* <Form.Item name="year" label="Investment Year" initialValue="1998">
              <Select
                placeholder="1998"
                bordered={false}
                className="firmProfileInputField"
              >
                <Select.Option name="year" value="year">
                  1998
                </Select.Option>

                <Select.Option name="year2" value="year2">
                  1997
                </Select.Option>
              </Select>
            </Form.Item> */}
          </div>
        </Form>
      </Modal>
    </>
  );
};
