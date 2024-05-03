import axios, { AxiosInstance } from "axios";
import {
  IFundAdminClient,
  ITokenProvider,
  IInvitationsService,
  IRolesService,
  IFirmProfileService,
  IMetaTagsInfoService,
  ISidebarService,
  IHeaderService,
  IInvestmentCompaniesTableService,
  ISlugListService,
  IPortCoService,
  IPortfolioCompanyUserService,
  IStakeholdersService,
  IUserService,
  ITransactionService,
} from "./contracts";
import { FirmDashboardService } from "./firmDashboard-service";
import { HeaderService } from "./services/common/header/header-service";
import { SidebarService } from "./services/common/sidebar/sidebar-service";
import { FirmProfileService } from "./services/firmProfile/firmProfile-service";
import { FundService } from "./services/fund/fund-service";
import { SlugService } from "./services/SlugList/slug-service";
import { PortcoAssociationService } from "./services/portcoassociation/portco";
import { InvitationsService } from "./services/invitations/invitations-service";
import { MetaTagsInfoService } from "./services/metaTagsInfo/metaTagsInfo-service";
import { RolesService } from "./services/roles/roles-service";
import { InvestmentCompaniesTableService } from "./services/InvestmentCompaniesTable/InvestmentCompaniesTable-service";
import { PortfolioCompanyUserSerice } from "./services/portfoliocompany/portfoliocompany";
import { TransactionService } from "./services/transactions/transaction-service";
import { StakeholdersService } from "./services/stakeholders/stakeholders-service";
import { UserService } from "./services/user/user-service";

export class FundAdminClient implements IFundAdminClient {
  public tenantSlugId!: string;
  public currentUserId!: string;
  private _instance: AxiosInstance;

  constructor(public baseURL: string, public tokenProvider: ITokenProvider) {
    this._instance = axios.create({
      baseURL: baseURL,
    });

    this._instance.defaults.headers.common["Accept"] = "application/json";
  }

  async getAxiosInstance(): Promise<AxiosInstance> {
    // The token provider should return a valid access token
    // i.e., the token has not expired
    const token = await this.tokenProvider.getAccessToken();

    // add the token to the header
    this._instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.value}`;

    return this._instance;
  }

  getInvitationsService(): IInvitationsService {
    return new InvitationsService(this);
  }

  getRolesService(): IRolesService {
    return new RolesService(this);
  }

  getFirmDashboardService() {
    return new FirmDashboardService(this);
  }

  getFundService() {
    return new FundService(this);
  }
  getFirmProfileService(): IFirmProfileService {
    return new FirmProfileService(this);
  }

  getMetaTagsInfoService(): IMetaTagsInfoService {
    return new MetaTagsInfoService(this);
  }

  SlugService(): ISlugListService {
    return new SlugService(this);
  }

  PortcoAssociationService(): IPortCoService {
    return new PortcoAssociationService(this);
  }

  getSidebarService(): ISidebarService {
    return new SidebarService(this);
  }

  getHeaderService(): IHeaderService {
    return new HeaderService(this);
  }

  InvestmentCompaniesTableService(): IInvestmentCompaniesTableService {
    return new InvestmentCompaniesTableService(this);
  }

  PortfolioCompanyUserSerice(): IPortfolioCompanyUserService {
    return new PortfolioCompanyUserSerice(this);
  }

  getTransactionService(): ITransactionService {
    return new TransactionService(this);
  }

  getStakeholdersService(): IStakeholdersService {
    return new StakeholdersService(this);
  }

  UserDataService(): IUserService {
    return new UserService(this);
  }
}
