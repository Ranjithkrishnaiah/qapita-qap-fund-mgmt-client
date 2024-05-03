import React, { useContext, useCallback } from "react";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AppContent from "../components/Authentication/AppContent";
import { AuthService } from "../services/AuthService";
import { useState, useEffect } from "react";
import { Investments } from "../pages/FirmInvestments";
import { Dashboard } from "../pages/Dashboard";
// import { ManageUsers } from "../pages/ManageUsers";
import { ManageUsers } from "../pages/ManageUsers/ManageUsers";
import { FirmProfile } from "../pages/FirmProfile";
import { ApplicationContext } from "../Context/ApplicationContext/ApplicationContextProvider";
import { TokenContext } from "../Context/TokenContext/TokenContextProvider";
import { Spin } from "antd";
import { FirmData } from "../pages/FirmData";
import { AcceptInvite } from "../pages/AcceptInvite";
import { MetaTags } from "../pages/MetaTags";
import Task from "../pages/PendingTask";
import { ProtCoAssociation } from "../pages/PortCoAssoation";
import { ManageRoles } from "../pages/ManageRoles";
import { FundDashboard } from "../pages/FundDashboard";
import { PortfolioCompany } from "../pages/PortfolioCompany";
import { FundPerformance } from "../pages/FundPerformance";
import { Transactions } from "../pages/Transactions";
import { companyIdInterface } from "../components/common/PortoFolioTopbar/companyIdInterface";
import { firmProfileInterface } from "../components/FirmProfileInfo/firmProfileInterface";
import { Layout } from "antd";
import { Header } from "../components/common/Header";
import { Sidebar } from "../components/common/Sidebar";
const { Content } = Layout;
import { Captable } from "../pages/Captable";

const iniuser = {
  ls: false,
  loadingUser: true,
};

let authService: AuthService;

const AppRoute: React.FC = (props) => {
  //using user context
  const { setSlugId, slugId } = useContext(ApplicationContext);
  const { setToken } = useContext(TokenContext);
  const [collapseTrigger, setCollapseTrigger] = useState(false);
  const [firm, setFirm] = useState<firmProfileInterface | undefined>();
  const [companyName, setCompanyName] = useState<companyIdInterface>();

  const defaultRoutes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
  ];

  const [routes, setRoutes] = useState(defaultRoutes);
  const [portCoData, setPortCoData] = useState([]);

  authService = new AuthService();

  const [auth, setAuth] = useState(iniuser);
  React.useEffect(
    function effectFunction() {
      const slugUrl = window.location.pathname.split("/")[1];
      setSlugId(slugUrl);
      getUserData();
    },
    [setSlugId]
  );

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    setAuth({
      ls: true,
      loadingUser: true,
    });
    authService.getUser().then((user) => {
      setAuth({
        ls: user != null,
        loadingUser: false,
      });
    });
  };

  const userDataToken = async () => {
    await authService.getUser().then((user) => {
      if (user) {
        const token = {
          value: user.access_token,
          expiresAt: new Date(user.expires_in),
        };
        setToken(token);
      }
    });
  };

  useEffect(() => {
    userDataToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {auth.loadingUser == true ? (
        <Spin />
      ) : (
        <Router>
          {/* {slugId && auth.ls === true ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/" />
          )} */}

          {auth.ls ? (
            <Switch>
              <Route exact path="/" render={(props) => <FirmData />} />
              <Layout>
                <Header
                  collapseTrigger={collapseTrigger}
                  setCollapseTrigger={setCollapseTrigger}
                  firm={firm}
                  setFirm={setFirm}
                />
                <Layout>
                  <Sidebar
                    collapseTrigger={collapseTrigger}
                    setCollapseTrigger={setCollapseTrigger}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    routes={routes}
                    setRoutes={setRoutes}
                    portCoData={portCoData}
                    setPortCoData={setPortCoData}
                  />
                  <Route
                    exact
                    path={`/${slugId}/dashboard`}
                    render={(props) => <Dashboard />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/fund-dashboard`}
                    render={(props) => <FundDashboard />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/fund-performance`}
                    render={(props) => <FundPerformance />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/investments`}
                    render={(props) => <Investments />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/user/manage`}
                    render={(props) => <ManageUsers />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/roles/manage`}
                    render={(props) => <ManageRoles />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/firm-profile`}
                    render={(props) => <FirmProfile />}
                  />
                  <Route
                    exact
                    path="/:slugId/user-invitations/:userInvitationId"
                    render={() => <AcceptInvite />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/meta-tags`}
                    render={(props) => <MetaTags />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/pending-task`}
                    render={(props) => <Task />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/portCo`}
                    render={(props) => <ProtCoAssociation />}
                  />
                  <Route
                    exact
                    path={`/${slugId}/:id/documents`}
                    render={(props) => (
                      <PortfolioCompany
                        routes={routes}
                        setRoutes={setRoutes}
                        portCoData={portCoData}
                        setPortCoData={setPortCoData}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={`/${slugId}/:companyId/transactions`}
                    render={(props) => <Transactions />}
                  />
                </Layout>
              </Layout>

              <Route
                exact
                path={`/${slugId}/:companyId/captable`}
                render={(props) => <Captable />}
              />
            </Switch>
          ) : (
            <Route
              path="/"
              render={(props) => (
                <AppContent currentLocation={props.location} />
              )}
            />
          )}
        </Router>
      )}
    </div>
  );
};

export default AppRoute;
