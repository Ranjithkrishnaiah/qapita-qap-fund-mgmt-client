import { ApiEndpoints } from "../../api";
import { IFundAdminClient, Models } from "../../contracts";

export class StakeholdersService {
  constructor(private client: IFundAdminClient) {}

  async getQmapCompanyStakeholders(portfolioCompanyId: number) {
    let url = ApiEndpoints.StakeholdersServiceInfo.getQmapCompanyStakeholders(
      this.client.tenantSlugId,
      portfolioCompanyId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async postQmapCompanyStakeholder(
    fundId: string,
    companyId: string,
    values: any
  ) {
    let url = ApiEndpoints.StakeholdersServiceInfo.postQmapCompanyStakeholder(
      this.client.tenantSlugId,
      fundId,
      companyId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.post(url, values);
    return response.data;
  }
}
