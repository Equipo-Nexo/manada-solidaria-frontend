import type { UserRole } from '../responses/GetUserProfileResponse';

export interface UpdateUserRolesRequest {
  roles: UserRole[];
}
