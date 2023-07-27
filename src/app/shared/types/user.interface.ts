export interface User {
  readonly userId?: number;
  readonly userType?: string;
  readonly email?: string;
  readonly userGroups?: string[];
  readonly dispatcherDepartmentId?: number;
  readonly dispatcherDepartment?: string;
}
