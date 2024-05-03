export type PaginationParams = {
  page: number;
  page_size: number;
  status?: string;
  roles?: string;
  searchText?: string;
};

export interface UserRole {
  roleId: string;
  name: string;
}

export interface Invite {
  userInvitationId: string;
  userInvitationStatus: {
    value: string;
  };
  userId: string;
  version: number | null;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: UserRole[];
  roles: string[];
}

export interface ReminderArray {
  slugId: string;
  invitationId: string;
}

// export interface User {
//   userInvitationId: string;
//   userInvitationStatus: {
//     value: string;
//   };
//   userId: string;
//   version: number | null;
//   firstName: string;
//   lastName: string;
//   email: string;
//   userRoles: UserRole[];
//   roles: string[];
// }
