import React, { ReactElement } from "react";
import "./fundCard.scss";
import { Row, Col, Divider } from "antd";
import { MoreOutlined } from "@ant-design/icons";
// import { addFundInterface } from "../AddFundModal/AddFundModalInterface";
import { useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../../../../Context/ApplicationContext/ApplicationContextProvider";
import { useEffect } from "react";
import axios from "axios";
import { AddFundModal } from "../AddFundModal";
import { EditFundModal } from "../EditFundModal";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { LinkStakeholderModal } from "../LinkStakeholderModal";

export interface addFundInterface {
  name: {
    brandName: string;
    legalName: string;
  };
  incorporationDetails: {
    country: string;
    corporateNumber: string;
    address: string;
  };
  fundSize: {
    currency: string;
    amount: number;
  };
  reportingCurrency: string;
  websiteUrl: string;
  managementFee: {
    currency: string;
    amount: number;
  };
  contactPerson: string;
  email: string;
  phoneNumber: number;
  carry: number;
  additionalMemo: string;
  hurdleTask: number;
  fundId: string;
}

let data;

export const FundCard = (): ReactElement => {
  const [fund, setFund] = useState<addFundInterface[]>();
  const [visible, setVisible] = useState(false);
  const [visibleLinkStakeholder, setVisibleLinkStakeholder] = useState(false);
  const [fundid, setFundId] = useState("");

  //using userTokenContext
  const { getClient, slugId } = useContext(ApplicationContext);
  const service = getClient().getFundService();

  useEffect(() => {
    service.getFund(fundid).then((response: any) => {
      setFund(response);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugId, getClient]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => setVisible(true)}>Edit Fund</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => setVisibleLinkStakeholder(true)}>Link Stakeholder</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {fund?.map((item, ind) => (
        <div className="fundCardWrapper" key={ind}>
          <Row justify="space-around" className="fundRowOne">
            <Col span={20}>
              <p className="fundNameHeading">{item.name.brandName}</p>
            </Col>
            <Col span={4} className="moreOutlined">
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow
                trigger={["click"]}
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreOutlined onClick={() => setFundId(item.fundId)} />
                </a>
              </Dropdown>
            </Col>
          </Row>

          <Row justify="center" className="fundInfoCardRow">
            <Col span={24} className="fundInfoCard">
              <div>
                <p className="fundInfoHeading">Capital Invested</p>
              </div>
              <div className="fundInfoColTwo">
                <p className="fundInfoData">
                  <span className="fundInfoCurrency">NA</span> NA
                </p>
              </div>
              <div>
                <p className="fundInfoHeading">Fair Value of Investment</p>
              </div>
              <div className="fundInfoColTwo">
                <p className="fundInfoData">
                  <span className="fundInfoCurrency">NA</span> NA
                </p>
              </div>
            </Col>
          </Row>

          <Row className="fundInfoBottomRow">
            <Col span={12} className="borderToshow">
              <Row className="fundInfoBottomRowTwo">
                <Col span={24}>MoIc</Col>
                <Col span={24}>NA</Col>
              </Row>
            </Col>

            {/* <Divider type="vertical" /> */}

            <Col span={12}>
              <Row className="fundInfoBottomRowTwo">
                <Col span={24}>IRR%</Col>
                <Col span={24}>NA</Col>
              </Row>
            </Col>
          </Row>
        </div>
      ))}
      <EditFundModal
        visible={visible}
        setVisible={setVisible}
        fundid={fundid}
        // setFundId={setFundId}
      />

      <LinkStakeholderModal
        visibleLinkStakeholder={visibleLinkStakeholder}
        setVisibleLinkStakeholder={setVisibleLinkStakeholder}
        fundid={fundid}
      />
    </>
  );
};
