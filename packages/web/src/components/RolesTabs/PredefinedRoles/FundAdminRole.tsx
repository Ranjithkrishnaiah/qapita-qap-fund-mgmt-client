import React from "react";
import "./predefinedRoles.scss";
import { Checkbox, Row, Col, message } from "antd";

export const FundAdminRole = () => {
  const handleOnChange = () => {
    message.info("Can not change predefined permissions");
  };
  return (
    <div>
      <p className="predefinedRolesHeading">Predefined Roles</p>
      <p className="roleNameTitles">Role Name</p>
      <p className="predinedRoleTypeName">Fund Administrator</p>
      <br />
      <p className="roleDescription">Role Description</p>
      <p className="roleDescriptionDetail">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
        veniam, quidem debitis assumenda cumque minima blanditiis alias vel
        natus nemo voluptatem, laboriosam deserunt, voluptate suscipit iste!
        Minus commodi at nostrum.
      </p>
      <br />

      {/* Permissions */}
      <p className="predefinedRolesHeading">Set Permissions</p>

      {/* Investment Firm */}
      <div className="rolesPermissionCont">
        <p className="manageRole">Investment Firm</p>
        <Row className="rolesCheckboxRow">
          <Col span={6}>
            <Checkbox value="A" checked={false} onChange={handleOnChange}>
              Dashboard
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="B" checked={false} onChange={handleOnChange}>
              Performance
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={false} onChange={handleOnChange}>
              Settings
            </Checkbox>
          </Col>
        </Row>
      </div>

      {/* Fund */}
      <div className="rolesPermissionCont">
        <p className="manageRole">Fund</p>
        <Row className="rolesCheckboxRow">
          <Col span={6}>
            <Checkbox value="A" checked={true} onChange={handleOnChange}>
              Dashboard
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="B" checked={true} onChange={handleOnChange}>
              Performance
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={true} onChange={handleOnChange}>
              Reports
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={true} onChange={handleOnChange}>
              Settings
            </Checkbox>
          </Col>
        </Row>
      </div>

      {/* Management */}
      <div className="rolesPermissionCont">
        <p className="manageRole">Management</p>
        <Row className="rolesCheckboxRow">
          <Col span={6}>
            <Checkbox value="A" checked={true} onChange={handleOnChange}>
              Add Funds
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="B" checked={true} onChange={handleOnChange}>
              Users
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={true} onChange={handleOnChange}>
              Meta tags
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={true} onChange={handleOnChange}>
              Firm Profile
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox value="C" checked={true} onChange={handleOnChange}>
              PortCo
            </Checkbox>
          </Col>
        </Row>
      </div>
    </div>
  );
};
