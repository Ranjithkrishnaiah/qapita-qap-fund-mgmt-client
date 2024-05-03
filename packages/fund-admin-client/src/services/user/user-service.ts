import { ApiEndpoints } from "../../api";
import { IFundAdminClient, IUserService } from "../../contracts";

export class UserService implements IUserService {
  constructor(private client: IFundAdminClient) {}

  public async getCurrentUserData() {
    const url = ApiEndpoints.UserData.getCurrentUserData(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }
}
