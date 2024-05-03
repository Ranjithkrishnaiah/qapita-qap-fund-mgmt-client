import { ApiEndpoints } from "../../api";
import { IFundAdminClient, ITransactionService } from "../../contracts";

export class TransactionService implements ITransactionService {
  constructor(private client: IFundAdminClient) {}

  async getShareIssuanceTransaction(companyId: string) {
    let url = ApiEndpoints.Transactions.getShareIssuanceUrl(
      this.client.tenantSlugId,
      companyId
    );
    let axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.data;
  }

  async getConvertibleIssuanceTransaction(companyId: string) {
    let url = ApiEndpoints.Transactions.getConvertibleIssuanceUrl(
      this.client.tenantSlugId,
      companyId
    );
    let axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.data;
  }

  async getWarrantIssuanceTransaction(companyId: string) {
    let url = ApiEndpoints.Transactions.getWarrantIssuanceUrl(
      this.client.tenantSlugId,
      companyId
    );
    let axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.data;
  }

  async getShareBuybackTransaction(companyId: string) {
    let url = ApiEndpoints.Transactions.getShareBuybackUrl(
      this.client.tenantSlugId,
      companyId
    );
    let axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.data;
  }

  async getShareTransferTransaction(companyId: string) {
    let url = ApiEndpoints.Transactions.getShareTransferUrl(
      this.client.tenantSlugId,
      companyId
    );
    let axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data.data;
  }
}
