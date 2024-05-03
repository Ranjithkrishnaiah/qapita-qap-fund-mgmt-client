import { ApiEndpoints } from "../../api";
import { IFundAdminClient } from "../../contracts";

const staticData = [
  {
    portfolioCompany: "Tamato",
    transactionDate: "-",
    capitalInvested: "647,163",
    ownership: "10.5",
    companyValuation: "6,035,872",
    realizedValue: "5,388,709",
    multiple: "1.0",
    IRR: "10",
    gainLoss: "5,388,709",
    RVPI: "6.18",
    DVPI: "0.15",
    sector: "Food Delivery",
    subSector: "-",
    securityClass: "Series B",
    dilutedOwnership: "5,388,709",
    noOfSecurities: "10,000",
    cashFlow: "",
  },
  {
    portfolioCompany: "Orange",
    transactionDate: "-",
    capitalInvested: "647,163",
    ownership: "10.5",
    companyValuation: "6,035,872",
    realizedValue: "5,388,709",
    multiple: "1.0",
    IRR: "10",
    gainLoss: "5,388,709",
    RVPI: "6.18",
    DVPI: "0.15",
    sector: "Food Delivery",
    subSector: "-",
    securityClass: "Series B",
    dilutedOwnership: "5,388,709",
    noOfSecurities: "10,000",
    cashFlow: "",
  },
  {
    portfolioCompany: "Giggy",
    transactionDate: "-",
    capitalInvested: "647,163",
    ownership: "10.5",
    companyValuation: "6,035,872",
    realizedValue: "5,388,709",
    multiple: "1.0",
    IRR: "10",
    gainLoss: "5,388,709",
    RVPI: "6.18",
    DVPI: "0.15",
    sector: "Food Delivery",
    subSector: "-",
    securityClass: "Series B",
    dilutedOwnership: "5,388,709",
    noOfSecurities: "10,000",
    cashFlow: "",
  },
];

const investmentSummaryData = [
  {
    totalCapital: "300,000,000",
    fundsDeployed: "88,984,379",
    fundsDeployedPercentage: "88.9",
    unUtilized: "11,015,621",
    unUtilizedPercentage: "11.1",
  },
];

export class InvestmentCompaniesTableService {
  constructor(private client: IFundAdminClient) {}

  public async getInvestmentCompaniesTableData() {
    const response = staticData;
    return response;
  }

  public async getInvestmentSummaryData() {
    const response = investmentSummaryData;
    return response;
  }

  public async getVisibleColumnsData() {
    const url = ApiEndpoints.InvestmentCompaniesTable.getVisibleColumns(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.configurationDto;
  }

  public async putVisibleColumnData(columns: string[]) {
    const url = ApiEndpoints.InvestmentCompaniesTable.putVisibleColumns(
      this.client.tenantSlugId,
      this.client.currentUserId
    );
    const axios = await this.client.getAxiosInstance();
    const body = {
      investmentsTable: {
        columns: [...columns],
        pageSize: 0,
        groupBy: ["string"],
      },
    };
    const response = await axios.put(url, body, {
      params: { isApplicableAtTenantLevel: false },
    });
    return response;
  }
}
