import {
  IFundAdminClient,
  IMetaTagsInfoService,
  Models,
} from "../../contracts";
import { ApiEndpoints } from "../../api";

export class MetaTagsInfoService implements IMetaTagsInfoService {
  constructor(private client: IFundAdminClient) {}

  async getMetaTagsInfo() {
    const url = ApiEndpoints.MetaTagsInfo.getMetaTagsInfoUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async getMetaTagsInfoId(dataId: string) {
    let url = ApiEndpoints.MetaTagsInfo.getMetaTagsInfoId(
      this.client.tenantSlugId,
      dataId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async deleteMetaTagsValues(dataId: string, removedTag: string) {
    let url = ApiEndpoints.MetaTagsInfo.deleteMetaTagsValues(
      this.client.tenantSlugId,
      dataId,
      removedTag
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.delete(url);
    return response.data;
  }

  async postMetaTagsValues(dataId: string, values: any) {
    let url = ApiEndpoints.MetaTagsInfo.postMetaTagsValues(
      this.client.tenantSlugId,
      dataId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.post(url, values);
    return response.data;
  }

  async getMetaTagsInfoMetatagId(metaTagId: string) {
    let url = ApiEndpoints.MetaTagsInfo.getMetaTagsInfoMetatagId(
      this.client.tenantSlugId,
      metaTagId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url);
    return response.data;
  }

  async putMetaTagsInfo(
    dataId: string,
    body: Models.MetaTagsEditInfoInterface
  ) {
    const url = ApiEndpoints.MetaTagsInfo.putMetaTagsInfo(
      this.client.tenantSlugId,
      dataId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response;
  }

  async deleteMetaTagInfo(metaTagId: string) {
    let url = ApiEndpoints.MetaTagsInfo.deleteMetaTagInfo(
      this.client.tenantSlugId,
      metaTagId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.delete(url);
    return response.data;
  }

  async postMetaTagsInfo(values: any) {
    let url = ApiEndpoints.MetaTagsInfo.postMetaTagsInfo(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.post(url, values);
    return response.data;
  }
}
