import { IFundAdminClient, IHeaderService } from "../../../contracts";
import { ApiEndpoints } from "../../../api";

export class HeaderService implements IHeaderService {
  constructor(private client: IFundAdminClient) {}

  async getLogo() {
    const url = ApiEndpoints.HeaderService.getLogo(this.client.tenantSlugId);
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url, {
      params: {
        placeholder: true,
      },
    });
    return response.data;
  }

  async getFirmName() {
    const url = ApiEndpoints.HeaderService.getFirmName(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }
}
