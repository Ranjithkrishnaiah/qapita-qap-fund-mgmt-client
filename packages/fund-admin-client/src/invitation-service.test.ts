import { FundAdminClient } from "./fundAdminClient";
//import jest from "jest";
import mocked from "ts-jest/utils";
import axios from "axios";
import { ITokenProvider, AccessToken, PageOf, Models } from "./contracts";

const badToken =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IkU1RDAxOTYwNDVENDQyNDQzMTBBMENDN0YwM0ZBQkE3QzQ5RjIwMUIiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiI1ZEFaWUVYVVFrUXhDZ3pIOEQtcnA4U2ZJQnMifQ.eyJuYmYiOjE2MzY3MjQzNzUsImV4cCI6MTYzNjcyNzk3NSwiaXNzIjoiaHR0cHM6Ly9hdXRoZGV2MS5xYXBpdGFjb3JwLmNvbSIsImF1ZCI6InFhcGl0YS5xZnVuZCIsImNsaWVudF9pZCI6InFhcGl0YS5xZnVuZC53ZWIudWkubG9jYWwiLCJzdWIiOiIwYWNlNGI2Ni01MGIyLTQ4ODgtODliMy03ZmJlMTY5YWQxY2IiLCJhdXRoX3RpbWUiOjE2MzY3MjQzNzUsImlkcCI6ImxvY2FsIiwibmFtZSI6InZhbXNlZSBrIiwiZ2l2ZW5fbmFtZSI6InZhbXNlZSIsImZhbWlseV9uYW1lIjoiayIsImVtYWlsIjoidmVkYW5zaC53YW5pQHFhcGl0YWNvcnAuY29tIiwic2NvcGUiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIiwicWFwaXRhLnFmdW5kIl0sImFtciI6WyJwd2QiXX0.VMPWajMjSXFRGQLTvRgnGx5QFkcZXWSJTImZCjoIVkWufNtsbyM8SEEZPVoWSZ_Zsf7anl_QqXe36PO-dBm2ZPOmHTcGvfzmKPcYhHs2_bEFiddQyzuvHqdNuQ7COzrLbq60v59Fqv38XBUVZXGdQGj9IwqRdOZuonqvBWlqNIxj7B7l0cBp2c0c15jWTMOk5DyxYexO3ifJm8o2Yk0akw7FTjjDu1lYtk01hYnVPExyV-jetL0aUmgldDqnTVoyXLg4IyyJ6e-HtKmCS_yFnhuWuOUNrMXujs5GPPQTkbEvxSUGmkYKH2bWEC3JV_lQgClDR0rghNrOmPHIT_2tPA";

class SimpleTokenProvider implements ITokenProvider {
  constructor(private token: AccessToken) {}

  public getAccessToken(): Promise<AccessToken> {
    return Promise.resolve(this.token);
  }
}

var tokenProvider = new SimpleTokenProvider({
  value: badToken,
  expiresAt: new Date(),
});

const client = new FundAdminClient(
  "https://qfunddev.qapitacorp.com",
  tokenProvider
);

describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      client.tenantSlugId = "qapita-3TI9V5";
      const service = client.getInvitationsService();
      const result = await service.getInvitations({ page: 1, size: 1 }, "");

      console.log(JSON.stringify(result));
      // then
      // expect(axios.get).toHaveBeenCalledWith(
      //   `https://qfunddev.qapitacorp.com/qapita-3TI9V5/api/v1/user-invitations`
      // );
      // expect(result).toEqual(data);
    });
  });
});

function expect(result: PageOf<Models.UserInvitations>) {
  throw new Error("Function not implemented.");
}
