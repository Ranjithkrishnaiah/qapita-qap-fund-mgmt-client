import React from "react";
import { ReactElement } from "react";
import FileManagerIcon from "../../shared/icons/FileManagerIcon";
import "./top.scss";
import Moment from "react-moment";

type PortCompanyuserProps = {
  title: string;
  value: any;
  time: string;
  file: string;
  data: string;
};

export const ModfiedDateTime = (props) => {
  const dateTime = new Date(props.time);
  if (dateTime.getDate() === new Date().getDate()) {
    return <Moment format="hh:mm A">{dateTime}</Moment>;
  } else if (dateTime.getDate() === new Date().getDate() - 1) {
    return <>{"Yesterday"}</>;
  } else if (dateTime.getDate() - new Date().getDate() > -7) {
    return <Moment format="dddd">{dateTime}</Moment>;
  }
  return <Moment format="MMM, dd">{dateTime}</Moment>;
};

export const CompanyUserTop = ({
  title,
  value,
  time,
  file,
  data,
}: PortCompanyuserProps): ReactElement => {
  return (
    <>
      <div className="CardContent wrapperChildWhite1">
        <div className="wrapperchild2">
          <FileManagerIcon />
          <p style={{ margin: "5px 3px" }} className="wrapperTime">
            <ModfiedDateTime time={time} />
          </p>
        </div>

        <div>
          <h3 className="wrapperchild3">{title}</h3>
        </div>
        <div className="WrapperData">
          <p>{file}</p>
          <p>{data}</p>
        </div>
      </div>
    </>
  );
};
