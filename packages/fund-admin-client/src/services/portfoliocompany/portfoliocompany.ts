import { AxiosResponseHeaders } from "axios";
import { ApiEndpoints } from "../../api";
import {
  IFundAdminClient,
  IPortfolioCompanyUserService,
} from "../../contracts";

export class PortfolioCompanyUserSerice
  implements IPortfolioCompanyUserService
{
  constructor(private client: IFundAdminClient) {}

  public async getCompanyDocuments(companyId: string, folderPath: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.getPortFolioCompanyUrl(
      this.client.tenantSlugId,
      companyId
    );
    const response = await service.get(url, {
      params: { folderPath: folderPath },
    });
    return response.data;
  }

  public async createFolder(
    body: {
      name?: string;
      description?: string;
      folderpath?: string;
      formfile?: any;
    },
    companyId: string
  ) {
    var service = await this.client.getAxiosInstance();
    // service.defaults.headers.common["content-type"] = "multipart/form-data";
    let url = ApiEndpoints.PortfolioCompanyList.crateFolderUrl(
      this.client.tenantSlugId,
      companyId
    );
    const response = await service.post(url, body);
    return response;
  }

  public async getDocumentId(companyId: string, documentId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.getDocumentIdUrl(
      this.client.tenantSlugId,
      companyId,
      documentId
    );
    const response = await service.get(url);
    return response.data;
  }

  public async deleteFolder(companyId: string, documentId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.deleteFolderUrl(
      this.client.tenantSlugId,
      companyId,
      documentId
    );
    const response = await service.delete(url);
    return response.data;
  }

  public async updateFolder(body: any, companyId: string, documentId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.updateFolderUrl(
      this.client.tenantSlugId,
      companyId,
      documentId
    );
    const response = await service.put(url, body);
    return response.data;
  }

  public async getRecentDocuments(companyId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.getRecentDocumentsUrl(
      this.client.tenantSlugId,
      companyId
    );
    const response = await service.get(url);
    return response.data;
  }

  public async downloadDocuments(companyId: string, documentId: string) {
    var service = await this.client.getAxiosInstance();
    let url = ApiEndpoints.PortfolioCompanyList.getDownloadDocumentsUrl(
      this.client.tenantSlugId,
      companyId,
      documentId
    );
    const response = await service.get(url, {responseType: 'blob'});
    let fileName = this.getFileNameFromResponseHeaders(response.headers);
    return {data: response.data, fileName: fileName};
  }

  private getFileNameFromResponseHeaders(headers: AxiosResponseHeaders): string {
    var contentDisposition = headers["content-disposition"];
    var fileName = contentDisposition.split(";")[1].split("filename=")[1];
    var ext = headers["content-type"].split("/")[1];
    if (!fileName.endsWith(ext)) {
      fileName = fileName + "." + ext;
    }
    return fileName;
  }
}
