import { ApiEndpoints } from "../../api";
import { IFundAdminClient, Models } from "../../contracts";

const staticData = [
  {
    company: "Tamata",
    value: "Assigned",
  },
  {
    company: "Giggy",
    value: "Unassigned",
  },
  {
    company: "Orange",
    value: "Assigned",
  },
  {
    company: "CookBook",
    value: "Unassigned",
  },
  {
    company: "PhotoGram",
    value: "Assigned",
  },
  {
    company: "Dream56",
    value: "Unassigned",
  },
  {
    company: "RedhatSr",
    value: "Assigned",
  },
  {
    company: "RareEnterprises",
    value: "Unassigned",
  },
];

export class PortcoAssociationService {
  constructor(private client: IFundAdminClient) {}

  public async getPortCoData() {
    const response = staticData;
    return response;
  }

  async getPortCoQmapCompanies() {
    const url = ApiEndpoints.PortCoInfo.getPortCoQmapCompaniesUrl(
      this.client.tenantSlugId
    );
    const slugWord = this.client.tenantSlugId.split("-");
    const searchText = slugWord[0];
    const axios = await this.client.getAxiosInstance();
    type params = { searchText: string };
    const params: params = { searchText };
    const response = await axios.get(url, { params });
    return response.data;
  }

  async postPortCoCompaniesValues(values: any) {
    let url = ApiEndpoints.PortCoInfo.postPortCoCompaniesValues(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.post(url, values);
    return response;
  }

  async putPortCoCompanyIssuerId(
    body: Models.putPortCoCompanyIssuerIdInterface
  ) {
    const url = ApiEndpoints.PortCoInfo.putPortCoCompanyIssuerId(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response;
  }

  async getPortCoMetaTags(companyId: string) {
    const url = ApiEndpoints.PortCoInfo.getPortCoMetaTagsUrl(
      this.client.tenantSlugId,
      companyId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response;
  }

  async putPortCoMetaTags(companyId: string, body: any) {
    const url = ApiEndpoints.PortCoInfo.getPortCoMetaTagsUrl(
      this.client.tenantSlugId,
      companyId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response;
  }
}
