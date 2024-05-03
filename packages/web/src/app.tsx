import React from "react";
import "antd/dist/antd.css";
import "../assets/scss/config.scss";
import AppRoute from "./Routes/AppRoute";
import { ApplicationContextProvider } from "./Context/ApplicationContext/ApplicationContextProvider";
import { TokenContextProvider } from "./Context/TokenContext/TokenContextProvider";

type AppProps = Record<string, unknown>;

const App: React.FC<AppProps> = (props) => (
  <TokenContextProvider>
    <ApplicationContextProvider>
      <AppRoute />
    </ApplicationContextProvider>
  </TokenContextProvider>
);

export default App;
