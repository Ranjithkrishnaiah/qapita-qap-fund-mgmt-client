import { ApiEndpoints } from "./api";
import { IFundAdminClient, IFirmDashboardService } from "./contracts";

export class FirmDashboardService implements IFirmDashboardService {
  constructor(private client: IFundAdminClient) {}

  public async getFirmDashboardStats() {
    const url = ApiEndpoints.FirmDashboard.getFirmDashboardUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }
}
``