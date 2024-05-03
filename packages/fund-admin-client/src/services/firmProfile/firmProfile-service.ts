import { IFundAdminClient, IFirmProfileService, Models } from "../../contracts";
import { ApiEndpoints } from "../../api";

export class FirmProfileService implements IFirmProfileService {
  constructor(private client: IFundAdminClient) {}

  async getFirmProfile() {
    const url = ApiEndpoints.FirmProfile.getFirmProfileUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async getFirmLogo() {
    const url = ApiEndpoints.FirmProfile.getFirmLogoUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url, {
      params: {
        placeholder: true,
      },
    });
    return response.data;
  }

  getFirmLogoUploadUrl() {
    const url = ApiEndpoints.FirmProfile.getFirmLogoUrl(
      this.client.tenantSlugId
    );
    return url;
  }

  async putFirmProfile(body: Models.firmProfileInterface) {
    const url = ApiEndpoints.FirmProfile.putFirmProfileUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response;
  }
}
