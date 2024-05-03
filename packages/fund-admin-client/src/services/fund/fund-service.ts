import { ApiEndpoints } from "../../api";
import { IFundAdminClient, IFundService } from "../../contracts";

export class FundService implements IFundService {
  constructor(private client: IFundAdminClient) {}

  public async addFund(body: any) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.Fund.addFundUrl(this.client.tenantSlugId);
    const response = await service.post(url, body);
  }

  public async getFund(fundId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.Fund.getFundUrl(this.client.tenantSlugId, fundId);
    const response = await service.get(url);
    return response.data;
  }

  public async updateFund(body: any, fundId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.Fund.updateFundurl(this.client.tenantSlugId, fundId);
    const response = await service.put(url, body);
    return response.data;
  }
}
