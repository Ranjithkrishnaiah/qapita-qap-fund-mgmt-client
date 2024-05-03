import { ApiEndpoints } from "../../api";
import {
  IFundAdminClient,
  IRolesService,
  PaginationParams,
} from "../../contracts";

export class RolesService implements IRolesService {
  constructor(private client: IFundAdminClient) {}

  public async getRoles(): Promise<any> {
    var axiosInstance = await this.client.getAxiosInstance();
    var url = ApiEndpoints.Roles.getRolesUrl(this.client.tenantSlugId);

    var response = await axiosInstance.get(url, {});

    return response.data;
  }

  public async getRoleActions(): Promise<any> {
    var axiosInstance = await this.client.getAxiosInstance();
    var url = ApiEndpoints.Roles.getRoleActionsUrl();

    var response = await axiosInstance.get(url);
    return response.data;
  }

  public async createCustomRoles(body: any): Promise<any> {
    var axiosInstance = await this.client.getAxiosInstance();
    var url = ApiEndpoints.Roles.getRolesUrl(this.client.tenantSlugId);
    var response = await axiosInstance.post(url, body);
    return response.data;
  }
}
