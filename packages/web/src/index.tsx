import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import QapClient from "@qapita/fund-admin-client";

ReactDOM.render(<App />, document.getElementById("root"));

const client = new QapClient();

console.log(`client.url=${client.getUrl()}`);
