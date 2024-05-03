import React, { useContext, useState } from "react";
import "antd/dist/antd.css";
import "./customRoleModal.scss";
import { Modal, Form, Input, Button, Checkbox, Select, Row, Col } from "antd";
import { ApplicationContext } from "../../../Context/ApplicationContext/ApplicationContextProvider";

type CustomRoleModalProps = {
  visible: boolean;
  onCancel: () => void;
};

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

export const CustomRoleModal = ({
  visible,
  onCancel,
}: CustomRoleModalProps) => {
  const [form] = Form.useForm();
  const [isCopyPermission, setIsCopyPermission] = useState(false);
  const [investmentOptions, setInvestmentOptions] = useState<string[]>([]);
  const [investmentList, setInvestmentList] = useState<string[]>([]);
  const [investIndeterminate, setInvestIndeterminate] = useState(false);
  const [checkAllInvest, setCheckAllInvest] = useState(false);
  const [fundOptions, setFundOptions] = useState<string[]>([]);
  const [fundList, setFundList] = useState<string[]>([]);
  const [fundIndeterminate, setFundIndeterminate] = useState(false);
  const [checkAllFund, setCheckAllFund] = useState(false);
  const [mgmtOptions, setMgmtOptions] = useState<string[]>([]);
  const [mgmtList, setMgmtList] = useState<string[]>([]);
  const [mgmtIndeterminate, setMgmtIndeterminate] = useState(false);
  const [checkAllMgmt, setCheckAllMgmt] = useState(false);

  const { getClient } = useContext(ApplicationContext);
  const service = getClient().getRolesService();

  React.useEffect(() => {
    service.getRoleActions().then((res) => {
      const investmentArr = res.filter(
        (el) => el.actionResourceType.value === "Investment Firm"
      );
      setInvestmentOptions(investmentArr.map((el) => el.description));

      const fundArr = res.filter(
        (el) => el.actionResourceType.value === "Fund"
      );
      setFundOptions(fundArr.map((el) => el.description));

      const mgmtArr = res.filter(
        (el) => el.actionResourceType.value === "Management"
      );
      setMgmtOptions(mgmtArr.map((el) => el.description));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Investment handle changes
  const onInvestChange = (list) => {
    setInvestmentList(list);
    setInvestIndeterminate(
      !!list.length && list.length < investmentOptions.length
    );
    setCheckAllInvest(list.length === investmentOptions.length);
  };

  const onInvestCheckAllChange = (e) => {
    setInvestmentList(e.target.checked ? investmentOptions : []);
    setInvestIndeterminate(false);
    setCheckAllInvest(e.target.checked);
  };

  // Funds handle Changes
  const onFundChange = (list) => {
    setFundList(list);
    setFundIndeterminate(!!list.length && list.length < fundOptions.length);
    setCheckAllFund(list.length === fundOptions.length);
  };

  const onFundCheckAllChange = (e) => {
    setFundList(e.target.checked ? fundOptions : []);
    setFundIndeterminate(false);
    setCheckAllFund(e.target.checked);
  };

  // Management handle Changes
  const onMgmtChange = (list) => {
    setMgmtList(list);
    setMgmtIndeterminate(!!list.length && list.length < mgmtOptions.length);
    setCheckAllMgmt(list.length === mgmtOptions.length);
  };

  const onMgmtCheckAllChange = (e) => {
    setMgmtList(e.target.checked ? mgmtOptions : []);
    setMgmtIndeterminate(false);
    setCheckAllMgmt(e.target.checked);
  };

  return (
    <Modal
      title="Add new role"
      visible={visible}
      onCancel={onCancel}
      centered
      width={800}
      footer={[
        <Button key="createRole" className="createRoleBtn">
          Create a Role
        </Button>,
      ]}
      className="customRoleModal"
    >
      <Form form={form} layout="vertical">
        <div className="customModalRoleCont">
          <Form.Item
            name="roleName"
            label="Role Name"
            rules={[
              {
                required: true,
                message: "Please input the role name",
              },
            ]}
          >
            <Input
              placeholder="Type new role"
              bordered={false}
              className="inviteInputField"
            />
          </Form.Item>
          {/* Text Area */}
          <Form.Item
            name="roleDescription"
            label="Role Description"
            rules={[
              {
                required: true,
                message: "Please input the role description",
              },
            ]}
          >
            <TextArea rows={1} placeholder="Description for new role" />
          </Form.Item>
        </div>
        {/* Copy Permission */}
        <Form.Item
          name="copyPermission"
          label="Do you want to copy permission?"
          rules={[
            {
              required: true,
              message: "Please check one option",
            },
          ]}
        >
          <Checkbox onChange={(e) => setIsCopyPermission(e.target.checked)}>
            Yes
          </Checkbox>
          <Checkbox onChange={() => setIsCopyPermission(false)}>No</Checkbox>
        </Form.Item>

        {/*Select */}
        {isCopyPermission && (
          <Form.Item name="permissionOptions" label="Copy permission from">
            <Select placeholder="Select user role">
              <Select.Option key="role1" value="investor">
                Investor
              </Select.Option>
              <Select.Option key="role2" value="administrator">
                Administrator
              </Select.Option>
            </Select>
          </Form.Item>
        )}
      </Form>
      <p>Set Permissions</p>
      {/* Investment Firm */}

      <Checkbox
        indeterminate={investIndeterminate}
        onChange={onInvestCheckAllChange}
        checked={checkAllInvest}
      >
        Investment Firm
      </Checkbox>

      <CheckboxGroup
        className="customRoleChecboxGroup"
        value={investmentList}
        onChange={onInvestChange}
      >
        <Row>
          {investmentOptions.map((action, ind) => {
            return (
              <Col span={12} key={ind}>
                <Checkbox value={action}>{action}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </CheckboxGroup>

      {/* Fund */}
      <div>
        <Checkbox
          indeterminate={fundIndeterminate}
          onChange={onFundCheckAllChange}
          checked={checkAllFund}
        >
          Fund
        </Checkbox>

        <CheckboxGroup
          className="customRoleChecboxGroup"
          value={fundList}
          onChange={onFundChange}
        >
          <Row>
            {fundOptions.map((action, ind) => {
              return (
                <Col span={12} key={ind}>
                  <Checkbox value={action}>{action}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </CheckboxGroup>
      </div>
      {/* Management */}
      <div>
        <Checkbox
          indeterminate={mgmtIndeterminate}
          onChange={onMgmtCheckAllChange}
          checked={checkAllMgmt}
        >
          Management
        </Checkbox>

        <CheckboxGroup
          className="customRoleChecboxGroup"
          value={mgmtList}
          onChange={onMgmtChange}
        >
          <Row>
            {mgmtOptions.map((action, ind) => {
              return (
                <Col span={12} key={ind}>
                  <Checkbox value={action}>{action}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </CheckboxGroup>
      </div>
    </Modal>
  );
};
