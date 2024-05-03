import { ApiEndpoints } from "../../api";
import { IFundAdminClient, ISlugListService } from "../../contracts";

export class SlugService implements ISlugListService {
  constructor(private client: IFundAdminClient) {}

  public async getSlug() {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.SlugIdList.getSlugUrl();
    const response = await service.get(url);
    return response.data;
  }
}
