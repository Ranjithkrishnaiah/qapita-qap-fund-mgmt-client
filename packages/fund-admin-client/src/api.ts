export class ApiEndpoints {
  public static Invitations = {
    getInvitationsUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/user-invitations`;
    },

    inviteUserUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/user-invitations`;
    },

    deleteInvitationUrl(tenantSlugId: string, invitationId: string) {
      return `${tenantSlugId}/api/v1/user-invitations/${invitationId}`;
    },

    sendReminderUrl(tenantSlugId: string, invitationId: string) {
      return `${tenantSlugId}/api/v1/user-invitations/${invitationId}/notify`;
    },

    acceptInviteUrl(tenantSlugId: string, invitationId: string) {
      return `${tenantSlugId}/api/v1/user-invitations/${invitationId}/accept`;
    },

    deleteUserUrl(tenantSlugId: string, userId: string) {
      return `${tenantSlugId}/api/v1/users/${userId}`;
    },

    updateUserRoleUrl(tenantSlugId: string, userId: string) {
      return `${tenantSlugId}/api/v1/users/${userId}/roles`;
    },
    getUserUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/users`;
    },
  };

  public static FirmDashboard = {
    getFirmDashboardUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/investments/stats`;
    },
  };

  public static Roles = {
    getRolesUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/roles`;
    },
    getRoleActionsUrl() {
      return `system/api/v1/role-actions`;
    },
  };

  public static Fund = {
    addFundUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/funds`;
    },

    getFundUrl(tenantSlugId: string, fundId: string) {
      return `${tenantSlugId}/api/v1/funds/${fundId}`;
    },

    updateFundurl(tenantSlugId: string, fundId: string) {
      return `${tenantSlugId}/api/v1/funds/${fundId}`;
    },
  };

  public static FirmProfile = {
    getFirmProfileUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/firm`;
    },

    getFirmLogoUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/logo`;
    },

    putFirmProfileUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/firm`;
    },
  };

  public static MetaTagsInfo = {
    getMetaTagsInfoUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/meta-tags`;
    },

    getMetaTagsInfoId(tenantSlugId: string, dataId: string) {
      return `${tenantSlugId}/api/v1/meta-tags/${dataId}`;
    },

    deleteMetaTagsValues(
      tenantSlugId: string,
      dataId: string,
      removedTag: string
    ) {
      return `${tenantSlugId}/api/v1/meta-tags/${dataId}/values/${removedTag}`;
    },

    postMetaTagsValues(tenantSlugId: string, dataId: string) {
      return `${tenantSlugId}/api/v1/meta-tags/${dataId}/values`;
    },

    getMetaTagsInfoMetatagId(tenantSlugId: string, metaTagId: string) {
      return `${tenantSlugId}/api/v1/meta-tags/${metaTagId}`;
    },

    putMetaTagsInfo(tenantSlugId: string, dataId: string) {
      return `${tenantSlugId}/api/v1/meta-tags/${dataId}`;
    },

    deleteMetaTagInfo(tenantSlugId: string, metaTagId: string) {
      return `${tenantSlugId}/api/v1/meta-tags/${metaTagId}`;
    },

    postMetaTagsInfo(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/meta-tags`;
    },
  };

  public static SidebarService = {
    getSidebarFunds(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/funds`;
    },

    getSidebarCompanies(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/companies`;
    },

    getSiderbarCompaniesId(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}`;
    },
  };

  public static HeaderService = {
    getLogo(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/logo`;
    },

    getFirmName(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/firm`;
    },
  };

  public static SlugIdList = {
    getSlugUrl() {
      return `system/api/v1/firms`;
    },
  };

  public static InvestmentCompaniesTable = {
    getVisibleColumns(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/firm/effective-configurations/ui.firmDashboard`;
    },
    putVisibleColumns(tenantSlugId: string, userId: string) {
      return `${tenantSlugId}/api/v1/users/${userId}/configurations/firm-dashboard`;
    },
  };
  public static PortCoInfo = {
    getPortCoQmapCompaniesUrl(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/qmap/companies`;
    },

    postPortCoCompaniesValues(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/companies`;
    },

    putPortCoCompanyIssuerId(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/companies/link-issuers`;
    },
    getPortCoMetaTagsUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/meta-tags`;
    },
    putPortCoMetaTagsUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/meta-tags`;
    },
  };

  public static PortfolioCompanyList = {
    getPortFolioCompanyUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents`;
    },

    crateFolderUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents`;
    },

    getDocumentIdUrl(
      tenantSlugId: string,
      companyId: string,
      documentId: string
    ) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/${documentId}`;
    },

    deleteFolderUrl(
      tenantSlugId: string,
      companyId: string,
      documentId: string
    ) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/${documentId}`;
    },

    updateFolderUrl(
      tenantSlugId: string,
      companyId: string,
      documentId: string
    ) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/${documentId}`;
    },

    getRecentDocumentsUrl(
      tenantSlugId: string,
      companyId: string
    ) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/recent-documents`;
    },

    getDownloadDocumentsUrl(
      tenantSlugId: string,
      companyId: string,
      documentId: string
    ) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/${documentId}/download`;
    },
  };

  //Transactions
  public static Transactions = {
    getShareIssuanceUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/share-issuance-transactions`;
    },
    getConvertibleIssuanceUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/convertible-issuance-transactions`;
    },
    getWarrantIssuanceUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/warrant-issuance-transactions`;
    },
    getShareBuybackUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/share-buyback-transactions`;
    },
    getShareTransferUrl(tenantSlugId: string, companyId: string) {
      return `${tenantSlugId}/api/v1/companies/${companyId}/documents/share-transfer-transactions`;
    },
  };

  public static UserData = {
    getCurrentUserData(tenantSlugId: string) {
      return `${tenantSlugId}/api/v1/current-user`;
    },
  };

  public static StakeholdersServiceInfo = {
    getQmapCompanyStakeholders(
      tenantSlugId: string,
      portfolioCompanyId: number
    ) {
      return `${tenantSlugId}/api/v1/qmap/${portfolioCompanyId}/stakeholders`;
    },

    postQmapCompanyStakeholder(
      tenantSlugId: string,
      fundId: string,
      companyId: string
    ) {
      return `${tenantSlugId}/api/v1/funds/${fundId}/companies/${companyId}/stakeholders`;
    },
  };
}
