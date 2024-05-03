import React, { useEffect, useState, useContext } from "react";

// import { ToastContainer, toast } from "react-toastify";

import { ApiService } from "../../services/ApiService";

import { AuthService } from "../../services/AuthService";

import AuthContent from "./AuthContent";

import Buttons from "./Buttons";

import * as H from "history";

let authService: AuthService;

let apiService: ApiService;

let shouldCancel: boolean;

interface AppContentProps {
  currentLocation: H.Location;
}

const AppContent: React.FC<AppContentProps> = (props) => {
  authService = new AuthService();

  apiService = new ApiService();

  shouldCancel = false;

  const [api, setApi] = useState({});

  const [user, setUser] = useState({});

  // using UserTokenContext

  //const { setToken } = useContext(ApplicationContext);
  //const { setToken } = useContext(TokenContext);

  const login = () => {
    const extraQueryParams = {};

    if (props.currentLocation && props.currentLocation.search) {
      const urlParams = new URLSearchParams(props.currentLocation.search);

      const userHintValue = urlParams.get("user_hint");

      if (userHintValue) {
        extraQueryParams["user_hint"] = userHintValue;
      }
    }

    authService.login({
      extraQueryParams: extraQueryParams as any,

      state: props.currentLocation?.pathname,
    });
  };

  useEffect(() => {
    login();
  });

  const callApi = () => {
    apiService
      .callApi()
      .then((data) => {
        setApi({ api: data.data });
        console.log(
          "Api return successfully data, check in section - Api response"
        );
      })
      .catch((error) => {
        // toast.error(error);
        console.log(error);
      });
  };

  useEffect(() => {
    shouldCancel = true;
  });

  const renewToken = () => {
    authService
      .renewToken()
      .then((user) => {
        console.log("Token has been sucessfully renewed. :-)");
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    return authService.logout();
  };

  const getUser = () => {
    authService.getUser().then((user) => {
      if (user) {
        // storing token in userTokenContext
        //setToken(user.access_token);
      } else {
        // toast.info("You are not logged in.");
        console.log("You are not logged in.");
      }

      if (!shouldCancel) {
        setUser({ user });
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 10);
  });

  return (
    <>
      <Buttons
        login={login}
        logout={logout}
        renewToken={renewToken}
        getUser={getUser}
        callApi={callApi}
      />

      <AuthContent api={api} user={user} />
    </>
  );
};

export default AppContent;
