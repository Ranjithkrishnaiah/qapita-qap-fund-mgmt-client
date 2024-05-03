import * as React from "react";

interface IButtonsProps {
  login: () => void;
  getUser: () => void;
  callApi: () => void;
  renewToken: () => void;
  logout: () => void;
}

const Buttons: React.SFC<IButtonsProps> = (props) => {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: "30px" }}>
        <button
          className="btn btn-primary btn-login"
          style={{ margin: "10px", display: "none" }}
          onClick={props.login}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Buttons;
