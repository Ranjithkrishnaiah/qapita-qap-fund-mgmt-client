import { AccessToken } from "@qapita/fund-admin-client/src/contracts";
import React, { createContext, useState } from "react";

interface ITokenContext {
  token: AccessToken;
  setToken: (t: AccessToken) => void;
  // tokenValue: string;
  // setTokenValue: (value: string) => void;
  // expiresAt: Date;
  // setExpiresAt: (date: Date) => void;
}

const tokenContextDefaultValue: ITokenContext = {
  token: {
    value: "",
    expiresAt: new Date(0),
  },
  setToken: () => {
    //return void;
  },
  // tokenValue: "",
  // setTokenValue: () => {
  //   //void
  // },
  // expiresAt: new Date(0),
  // setExpiresAt: () => {
  //   //void
  // },
};

export const TokenContext = createContext<ITokenContext>(
  tokenContextDefaultValue
);

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState<AccessToken>(
    tokenContextDefaultValue.token
  );
  // const [tokenValue, setTokenValue] = useState<string>(
  //   tokenContextDefaultValue.tokenValue
  // );

  // const [expiresAt, setExpiresAt] = useState<Date>(
  //   tokenContextDefaultValue.expiresAt
  // );

  const value: ITokenContext = {
    token,
    setToken,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};
