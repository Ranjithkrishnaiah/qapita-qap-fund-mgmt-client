// import React from "react";
// import { FundAdminClient } from "@qapita/fund-admin-client/src/fundAdminClient";
// import ClientContext, {
//   ClientsContext as ClientContextInterface,
// } from "./client-context";

// export interface ClientProviderOptions {
//   fundAdminClient: FundAdminClient;
//   children?: React.ReactNode;
// }

// const toClientContextOptions = (
//   options: ClientProviderOptions
// ): ClientContextInterface => ({
//   getFundAdminClient: () => options.fundAdminClient,
// });

// const ClientContextProvider = (opts: ClientProviderOptions): JSX.Element => {
//   const { children } = opts;
//   return (
//     <ClientContext.Provider value={toClientContextOptions(opts)}>
//       {children}
//     </ClientContext.Provider>
//   );
// };

// export default ClientContextProvider;
