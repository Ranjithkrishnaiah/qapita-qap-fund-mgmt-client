import * as React from "react";
// import JsonTreeViewer from "./JsonTreeViewer";

export interface IAuthContentProps {
  api: any;
  user: any;
}

const AuthContent: React.FC<IAuthContentProps> = (props) => {
  const shouldExpandNode = (
    keyPath: Array<string | number>,
    data: [any],
    level: number
  ) => {
    return true;
  };
  return (
    <div className="row">
      <div className="col-md-6">
        {/* {/ {this.props.user.access_token === true ? <Dashboard /> : ""} /}
              {/ <JsonTreeViewer data={this.props.user} title="User Profile" shouldExpandNode={this.shouldExpandNode} /> /} */}
      </div>
      <div className="col-md-6">
        {/* {/ <JsonTreeViewer data={this.props.api} title="Api Response" shouldExpandNode={this.shouldExpandNode} /> /} */}
      </div>
    </div>
  );
};

export default AuthContent;
