import { IFundAdminClient, ISidebarService } from "../../../contracts";
import { ApiEndpoints } from "../../../api";

export class SidebarService implements ISidebarService {
  constructor(private client: IFundAdminClient) {}

  async getSidebarFunds() {
    const url = ApiEndpoints.SidebarService.getSidebarFunds(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async getSidebarCompanies() {
    const url = ApiEndpoints.SidebarService.getSidebarCompanies(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async getSidebarCompaniesId(companyId: string) {
    const url = ApiEndpoints.SidebarService.getSiderbarCompaniesId(
      this.client.tenantSlugId,
      companyId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }
}
