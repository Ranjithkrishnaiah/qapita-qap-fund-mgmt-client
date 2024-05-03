import React, { createContext, useContext, useState } from "react";
import { FundAdminClient } from "@qapita/fund-admin-client/src/fundAdminClient";
import { ApiUrls } from "../../apiUrls";
import {
  AccessToken,
  ITokenProvider,
} from "@qapita/fund-admin-client/src/contracts";
import { TokenContext } from "../TokenContext/TokenContextProvider";

interface ApplicationContext {
  slugId: string;
  setSlugId: (slugId: string) => void;
  getClient: () => FundAdminClient;
  userId: string;
  setUserId: (userId: string) => void;
}

const stub = (): never => {
  throw new Error(
    "You forgot to wrap your component in <ClientContextProvider>."
  );
};

const applicationDefaultValue: ApplicationContext = {
  slugId: "",
  setSlugId: () => {
    //return void
  },
  getClient: stub,
  userId: "",
  setUserId: () => {
    //return void
  },
};

export const ApplicationContext = createContext<ApplicationContext>(
  applicationDefaultValue
);

class AccessTokenProvider implements ITokenProvider {
  private _accessToken: AccessToken = {
    value: "",
    expiresAt: new Date(0),
  };

  setToken(token: AccessToken) {
    this._accessToken = token;
  }

  public getAccessToken(): Promise<AccessToken> {
    return Promise.resolve(this._accessToken);
  }
}

const tokenProvider = new AccessTokenProvider();
const client = new FundAdminClient(ApiUrls.BASE_URL, tokenProvider);

export const ApplicationContextProvider = ({ children }) => {
  const { token } = useContext(TokenContext);
  const [slugId, setSlugId] = useState<string>(applicationDefaultValue.slugId);
  const [userId, setUserId] = useState<string>(applicationDefaultValue.userId);
  tokenProvider.setToken(token);

  const getClient = () => {
    client.tenantSlugId = slugId;
    client.currentUserId = userId;
    return client;
  };

  const value: ApplicationContext = {
    slugId,
    setSlugId,
    getClient,
    userId,
    setUserId,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
