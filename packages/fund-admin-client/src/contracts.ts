import { AxiosInstance } from "axios";

// Fund Admin Client Interface
export interface IFundAdminClient {
  getAxiosInstance(): Promise<AxiosInstance>;
  tenantSlugId: string;
  getInvitationsService(): IInvitationsService;
  getRolesService(): IRolesService;
  getTransactionService(): ITransactionService;
  currentUserId: string;
}

export type AccessToken = {
  value: string;
  expiresAt: Date;
};

export interface ITokenProvider {
  getAccessToken(): Promise<AccessToken>;
}

interface UserRole {
  roleId: string;
  name: string;
}

// Models
export namespace Models {
  export interface UserInvitations {
    userInvitationId: string;
    userInvitationStatus: {
      value: string;
    };
    version: number | null;
    firstName: string;
    lastName: string;
    email: string;
    userRoles: UserRole[];
    roles: string[];
  }
  export type Roles = {};
  export interface FirmDashboardInterface {
    fundsCount: number;
    portfolioCompaniesCount: number;
    totalCapitalInvested: { amount: number; currency: { code: string } };
    fairValue: { amount: number; currency: { code: string } };
    profit: { amount: number; currency: { code: string } };
    realizedValue: { amount: number; currency: { code: string } };
    multiple: number;
    irr: number;
  }
  export interface firmProfileInterface {
    organizationName: {
      brandName: string | undefined;
      legalName: string | undefined;
    };
    incorporationDetails: {
      country: string | undefined;
      corporateNumber: string | undefined;
      address: string | undefined;
    };
    contactPerson: string | undefined;
    contactNumber: number | undefined;
    emailId: string | undefined;
    websiteUrl: string | undefined;
    reportingCurrency: string | undefined;
  }

  export interface MetaTagsInfoInterface {
    id: string;
    name: string;
    values: string[];
  }

  export interface MetaTagsEditInfoInterface {
    name: string | undefined;
    values: string[] | undefined;
  }

  export interface FundObject {
    id: string;
    name: { brandName: string; legalName: string };
  }

  export interface ProtCoObject {
    id: string;
    qMapIssuerId: number;
    legalName: string;
    linkStatus: string;
  }

  export interface ProtCoQmapCompanies {
    issuerId: number;
    issuerName: string;
    isSelfManaged: boolean;
    isLinked: boolean;
  }

  export interface putPortCoCompanyIssuerIdInterface {
    issuerId: number;
    companyId: string;
  }

  //Transactions
  export interface ShareIssuance {
    id: string;
    certificateCode: string | null;
    tags: string[] | [];
    fund: string | null;
    shareClassCode: string | null;
    units: number;
    issuePricePerShare: {
      amount: number;
      currency: {
        code: string;
      };
    };
    issueDate: string;
  }

  export interface ConvertibleIssuance {
    id: string;
    tags: string[] | [];
    convertibleClassCode: string;
    amountInvested: {
      amount: number;
      currency: {
        code: string;
      };
    };
    issueDate: string;
    maturityDate: string;
  }

  export interface WarrantIssuance {
    id: string;
    tags: string[] | [];
    stakeholderName: string;
    warrantClassCode: string;
    warrantUnits: number;
    purchasePricePerUnit: {
      amount: number;
      currency: {
        code: string;
      };
    };
    dateOfIssuance: string;
  }

  export interface ShareBuyback {
    id: string;
    tags: string[] | [];
    stakeholder: {
      fundId: null | string;
      legalName: string;
      stakeholderType: string;
    };
    shareClassCode: string;
    units: number;
    pricePerShare: {
      amount: number;
      currency: {
        code: string;
      };
    };
    buyBackDate: string;
  }

  export interface ShareTransfer {
    id: string;
    certificateCode: string | null;
    tags: string[] | [];
    buyer: {
      fundId: null | string;
      legalName: string | null;
      stakeholderType: string | null;
    };
    seller: {
      fundId: null | string;
      legalName: string | null;
      stakeholderType: string | null;
    };
    shareClassCode: string;
    units: number;
    pricePerShare: {
      amount: number;
      currency: {
        code: string;
      };
    };
    transferDate: string;
  }
}

export type PageOf<T> = {
  page: number;
  page_size: number;
  data: T[];
};

export type PaginationParams = {
  page: number;
  page_size: number;
  status?: string;
  roles?: string;
  searchText?: string;
};

// Invitation Service Interafce
export interface IInvitationsService {
  getInvitations(params: PaginationParams): Promise<Models.UserInvitations>;
  inviteUser(values: any): Promise<void>;
  deleteInvitation(invitationId: string): Promise<any>;
  sendReminder(
    invitationId: string,
    body: { invitationId: string }
  ): Promise<any>;
  acceptInvite(invitationId: string, body: {}): Promise<any>;
  deleteUser(userId: string): Promise<any>;
  updateUserRole(userId: string, roles: { roles: string[] }): Promise<any>;
  getUser(params: {
    page: number;
    page_size: number;
    roles?: string;
    blankSearchText?: string;
  }): Promise<any>;
}

//Roles Service interface
export interface IRolesService {
  getRoles(): Promise<any>;
  getRoleActions(): Promise<any>;
}

//Firm Dashboard Service interface
export interface IFirmDashboardService {
  getFirmDashboardStats(): Promise<Models.FirmDashboardInterface>;
}

//fundservice interface

export interface IFundService {
  addFund(body: any): Promise<any>;
  getFund(fundId: string): Promise<any>;
  updateFund(body: any, fundId: string): Promise<any>;
}

// Fund Admin Client Interface
// export interface IFundAdminClient {
//   getAxiosInstance(): Promise<AxiosInstance>;
//   tenantSlugId: string;
//   getInvitationsService(): IInvitationsService;
//   getRolesService(): IRolesService;
//   currentUserId: string;
// }

//FirmProfile Service interface
export interface IFirmProfileService {
  getFirmProfile(): Promise<Models.firmProfileInterface>;
  getFirmLogo(): Promise<any>;
  putFirmProfile(body: Models.firmProfileInterface): Promise<any>;
  getFirmLogoUploadUrl(): string;
}

//MetaTagsInfo Service interface
export interface IMetaTagsInfoService {
  getMetaTagsInfo(): Promise<Models.MetaTagsInfoInterface>;
  getMetaTagsInfoId(dataId: string): Promise<any>;
  deleteMetaTagsValues(dataId: string, removedTag: string): Promise<any>;
  postMetaTagsValues(dataId: string, values: any): Promise<any>;
  getMetaTagsInfoMetatagId(
    metaTagId: string
  ): Promise<Models.MetaTagsEditInfoInterface>;
  putMetaTagsInfo(
    dataId: string,
    body: Models.MetaTagsEditInfoInterface
  ): Promise<any>;
  deleteMetaTagInfo(metaTagId: string): Promise<any>;
  postMetaTagsInfo(values: any): Promise<any>;
}

//Sidebar Service interface
export interface ISidebarService {
  getSidebarFunds(): Promise<Models.FundObject>;
  getSidebarCompanies(): Promise<Models.ProtCoObject>;
  getSidebarCompaniesId(companyId: string): Promise<any>;
}

//Header Service interface
export interface IHeaderService {
  getLogo(): Promise<any>;
  getFirmName(): Promise<Models.firmProfileInterface>;
}

//Slug List
export interface ISlugListService {
  getSlug(): Promise<any>;
}

// PortCo Associations Service Ineterface
export interface IPortCoService {
  getPortCoData(): Promise<any>;
  getPortCoQmapCompanies(): Promise<Models.ProtCoQmapCompanies>;
  postPortCoCompaniesValues(values: any): Promise<any>;
  putPortCoCompanyIssuerId(
    body: Models.putPortCoCompanyIssuerIdInterface
  ): Promise<any>;
  getPortCoMetaTags(companyId: string): Promise<any>;
  putPortCoMetaTags(companyId: string, body: any): Promise<any>;
}

// InvestmentCompaniesTable Service Interface
export interface IInvestmentCompaniesTableService {
  getInvestmentCompaniesTableData(): Promise<any>;
  getInvestmentSummaryData(): Promise<any>;
  getVisibleColumnsData(): Promise<any>;
  putVisibleColumnData(columns: string[]): Promise<any>;
}

export type Documents = {
  id: string;
  name: string;
  description: string;
  folderPath: string;
  modifiedOn: string;
  documentType: string;
};

export type DocumentsPage = {
  currentPage: number;
  totalCount: number;
  data: Documents[];
};

export type DownloadContent = {
  data: any;
  fileName: string;
};

// PortfolioCompanyUser Service InterFace
export interface IPortfolioCompanyUserService {
  getCompanyDocuments(companyId: string, folderPath: string): Promise<any>;
  createFolder(
    body: { name?: string; description?: string; folderpath?: string },
    companyId: string
  ): Promise<any>;
  getDocumentId(companyId: string, documentId: string): Promise<any>;
  deleteFolder(companyId: string, documentId: string): Promise<any>;
  updateFolder(body: any, companyId: string, documentId: string): Promise<any>;
  getRecentDocuments(companyId: string): Promise<DocumentsPage>;
  downloadDocuments(
    companyId: string,
    documentId: string
  ): Promise<DownloadContent>;
}

//Transaction Service interface
export interface ITransactionService {
  getShareIssuanceTransaction(
    companyId: string
  ): Promise<Models.ShareIssuance[]>;

  getConvertibleIssuanceTransaction(
    companyId: string
  ): Promise<Models.ConvertibleIssuance[]>;

  getWarrantIssuanceTransaction(
    companyId: string
  ): Promise<Models.WarrantIssuance[]>;

  getShareBuybackTransaction(companyId: string): Promise<Models.ShareBuyback[]>;

  getShareTransferTransaction(
    companyId: string
  ): Promise<Models.ShareTransfer[]>;
}

//User Service Interface
export interface IUserService {
  getCurrentUserData(): Promise<any>;
}

// Stakeholders Service InterFace
export interface IStakeholdersService {
  getQmapCompanyStakeholders(portfolioCompanyId: number): Promise<any>;
  postQmapCompanyStakeholder(
    fundId: string,
    companyId: string,
    values: any
  ): Promise<any>;
}
