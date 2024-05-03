import React, { ReactElement, useState, useContext, useEffect } from "react";
import "./inviteUserModal.scss";
import "antd/dist/antd.css";
import { Modal, Form, Input, Button, Select } from "antd";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { User, Role } from "../../../../pages/ManageUsers";
import { Invite } from "@qapita/fund-admin-client/src/services/invitations/contracts";

type InviteUSerModalProps = {
  visible: boolean;
  setVisible: (a: boolean) => void;
  onCancel: () => void;
  setInvites: (a: Invite[]) => void;
  roles: Role[];
  page: number;
  setTotalResult: (a: number) => void;
  itemsPerPage: number;
};

export const InviteUserModal = ({
  visible,
  setVisible,
  onCancel,
  setInvites,
  roles,
  page,
  setTotalResult,
  itemsPerPage,
}: InviteUSerModalProps): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { getClient } = useContext(ApplicationContext);

  const client = getClient().getInvitationsService();

  const handleSend = () => {
    const rolesArr: string[] = [];

    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        rolesArr.push(values.roles);
        values.roles = rolesArr;
        form.resetFields();
        client.inviteUser(values).then(() => {
          client
            .getInvitations({ page, page_size: itemsPerPage })
            .then((res: any) => {
              setInvites(res.data);
              setTotalResult(res.totalCount);
            });
        });
      })
      .then(() => setLoading(false))
      .then(() => setVisible(false));
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        centered
        title="Invite Users"
        footer={[
          <Button key="submit" className="sendInviteBtn" onClick={handleSend}>
            Send
          </Button>,
        ]}
        confirmLoading={loading}
        className="newStyle"
      >
        <Form form={form} layout="vertical">
          {/* First Name */}
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input the first name of the user",
              },
            ]}
          >
            <Input
              placeholder="Walter"
              bordered={false}
              className="inviteInputField"
            />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input the last name of the user",
              },
            ]}
          >
            <Input
              placeholder="White"
              bordered={false}
              className="inviteInputField"
            />
          </Form.Item>

          {/* Legal Name */}
          <Form.Item
            name="legalName"
            label="Legal Name"
            rules={[
              {
                required: true,
                message: "Please input the User Legal Name ",
              },
            ]}
          >
            <Input
              placeholder="India"
              bordered={false}
              className="inviteInputField"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the User Email",
              },
            ]}
          >
            <Input
              placeholder="walter@gmail.com"
              bordered={false}
              className="inviteInputField"
            />
          </Form.Item>

          {/* Investment Fund */}
          <Form.Item name="investmentFund" label="Investment Fund">
            <Select
              placeholder="Fund Name"
              bordered={false}
              className="inviteInputField"
            >
              <Select.Option value="qapita">Qapita</Select.Option>
              <Select.Option value="vulcan">Vulcan</Select.Option>
              <Select.Option value="seqouia">Seqouia</Select.Option>
            </Select>
          </Form.Item>

          {/* Roles */}
          <Form.Item
            name="roles"
            label="Role"
            rules={[
              {
                required: true,
                message: "Please input the User Role",
              },
            ]}
          >
            <Select
              placeholder="Administrator"
              bordered={false}
              className="inviteInputField"
            >
              {roles?.map((role) => (
                <Select.Option key={role.roleId} value={role.roleId}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
