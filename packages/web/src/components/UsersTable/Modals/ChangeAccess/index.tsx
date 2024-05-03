import React, { useEffect, useContext, useState } from "react";
import { Modal, Button, Row, Col, Checkbox, Divider, Select, Form } from "antd";
import { Role, User, UserRole } from "../../../../pages/ManageUsers";
import axios from "axios";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";

type ChangeAccessModalProps = {
  visible: boolean;
  onCancel: () => void;
  firstName: string;
  lastName: string;
  roles: Role[];
  setRoles: (a: Role[]) => void;
  setPopupVisible: (a: boolean) => void;
  userRoles: UserRole[];
  userId: string;
  page: number;
  pageSize: number;
  // statusList: string[];
  // roleList: string[];
  setUsers: (a: User[]) => void;
};

const { Option } = Select;

export const ChangeAccessModal = ({
  visible,
  onCancel,
  firstName,
  lastName,
  roles,
  setRoles,
  setPopupVisible,
  userRoles,
  userId,
  page,
  pageSize,
  // statusList,
  // roleList,
  setUsers,
}: ChangeAccessModalProps) => {
  const [checkedRoles, setCheckedRoles] = useState<string[]>([]);
  const { slugId, getClient } = useContext(ApplicationContext);
  const [form] = Form.useForm();
  const roleService = getClient().getRolesService();
  const inviteService = getClient().getInvitationsService();

  const children = [
    <Option key="11" value="qapitaFund">
      Qapita Fund1
    </Option>,
    <Option key="11" value="qapitaFund2">
      Vulcan
    </Option>,
    <Option key="11" value="qapitaFund3">
      Qapita Fund3
    </Option>,
  ];

  // useEffect(() => {
  //   //getting roles
  //   roleService.getRoles().then((res) => setRoles(res));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [slugId, getClient]);

  useEffect(() => {
    if (visible) {
      setPopupVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const defaultValues: string[] = [];

  //setting default values for existing role of user
  useEffect(() => {
    roles?.map((role) => {
      const bool = userRoles.some((r) => r.roleId === role.roleId);
      if (bool) defaultValues.push(role.roleId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleOnChange = (values) => {
    setCheckedRoles(values);
  };

  const handleUpdate = () => {
    // const status = statusList.toString();
    // const roles = roleList.toString();
    const payload = {
      roles: checkedRoles,
    };

    inviteService.updateUserRole(userId, payload).then(() => {
      inviteService
        .getUser({ page, page_size: pageSize })
        .then((res: any) => setUsers(res.data))
        .then(() => onCancel());
    });
  };

  const title = () => {
    return (
      <h3>
        Change in{" "}
        <strong style={{ textTransform: "capitalize", color: "#633ea5" }}>
          {firstName} {lastName}
        </strong>{" "}
        Access
      </h3>
    );
  };

  return (
    <Modal
      centered
      title={title()}
      onCancel={onCancel}
      visible={visible}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" className="deleteUserBtn" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Select Roles"
          rules={[
            {
              required: true,
              message: "Please select a role",
            },
          ]}
        >
          <Checkbox.Group
            defaultValue={defaultValues}
            style={{ width: "100%" }}
            onChange={handleOnChange}
          >
            <Row>
              {roles?.map((role) => {
                return (
                  <Col span={8} key={role.roleId}>
                    <Checkbox value={role.roleId}>{role.name}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider />

        {/* <Form.Item label="Select Funds"> */}
        {/* <p>Select Funds</p> */}
        {/* <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="N/A"
            // onChange={handleChange}
          >
            {children}
          </Select> */}
        {/* </Form.Item> */}
      </Form>
    </Modal>
  );
};
