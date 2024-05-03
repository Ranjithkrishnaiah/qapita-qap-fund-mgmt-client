import axios from "axios";
import React, { useState, useEffect } from "react";
import { List, message, Avatar, Skeleton, Divider } from "antd";
import { useContext } from "react";
import { ApplicationContext } from "../../Context/ApplicationContext/ApplicationContextProvider";

export interface firmInterface {
  contactNumber: number;
  contactPerson: string;
  emailId: string;
  id: string;
  incorporationDetails: {
    country: string;
    corporateNumber: string;
    address: null;
  };
  organizationName: { brandName: string; legalName: string };
  reportingCurrency: string;
  slugId: string;
  version: number;
  websiteUrl: string;
}

export const FirmData: React.FC = (props) => {
  const [data, setData] = useState<firmInterface[]>();
  const { getClient } = useContext(ApplicationContext);
  const service = getClient().SlugService();

  useEffect(() => {
    service.getSlug().then((response: any) => {
      setData(response.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100%",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<a href={`/${item.slugId}/dashboard`}>{item.slugId}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
