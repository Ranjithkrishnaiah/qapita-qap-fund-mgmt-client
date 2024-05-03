import { IFundAdminClient, IInvitationsService } from "../../contracts";
import { ApiEndpoints } from "../../api";

export class InvitationsService implements IInvitationsService {
  constructor(private client: IFundAdminClient) {}

  async getInvitations(params: {
    page: number;
    page_size: number;
    roles?: string;
    searchText?: string;
  }) {
    let url = ApiEndpoints.Invitations.getInvitationsUrl(
      this.client.tenantSlugId
    );
    const axios = await this.client.getAxiosInstance();

    const response = await axios.get(url, {
      params: {
        page: params?.page,
        page_size: params?.page_size,
        status: "Pending",
        roles: params?.roles,
        searchText: params?.searchText,
      },
    });
    return response.data;
  }

  async inviteUser(values: any): Promise<void> {
    let url = ApiEndpoints.Invitations.inviteUserUrl(this.client.tenantSlugId);
    const axios = await this.client.getAxiosInstance();
    const response = await axios.post(url, values);
    return response.data;
  }

  async deleteInvitation(invitationId: string): Promise<any> {
    let url = ApiEndpoints.Invitations.deleteInvitationUrl(
      this.client.tenantSlugId,
      invitationId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.delete(url);
    return response.data;
  }

  async sendReminder(
    invitationId: string,
    body: { invitationId: string }
  ): Promise<any> {
    let url = ApiEndpoints.Invitations.sendReminderUrl(
      this.client.tenantSlugId,
      invitationId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response.data;
  }

  async acceptInvite(invitationId: string, body: {}): Promise<any> {
    let url = ApiEndpoints.Invitations.acceptInviteUrl(
      this.client.tenantSlugId,
      invitationId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, body);
    return response.data;
  }

  async deleteUser(userId: string): Promise<any> {
    let url = ApiEndpoints.Invitations.deleteUserUrl(
      this.client.tenantSlugId,
      userId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.delete(url);
    return response.data;
  }

  async updateUserRole(
    userId: string,
    roles: { roles: string[] }
  ): Promise<any> {
    let url = ApiEndpoints.Invitations.updateUserRoleUrl(
      this.client.tenantSlugId,
      userId
    );
    const axios = await this.client.getAxiosInstance();
    const response = await axios.put(url, roles);
    return response.data;
  }

  async getUser(params: {
    page: number;
    page_size: number;
    roles?: string;
    blankSearchText?: string;
  }): Promise<any> {
    let url = ApiEndpoints.Invitations.getUserUrl(this.client.tenantSlugId);

    const axios = await this.client.getAxiosInstance();
    const response = await axios.get(url, {
      params: {
        page: params?.page,
        page_size: params?.page_size,
        roles: params?.roles,
        blankSearchText: params?.blankSearchText,
      },
    });
    return response.data;
  }
}
