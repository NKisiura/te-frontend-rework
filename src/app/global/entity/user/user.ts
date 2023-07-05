import { DTO } from '../DTO';

export class User implements DTO {
  constructor(
    public userId?: number,
    public userType?: string,
    public email?: string,
    public userGroups?: string[],
    public dispatcherDepartmentId?: number,
    public dispatcherDepartment?: string
  ) {}

  public populateFromDTO(dto: any) {
    this.userId = dto['userId'];
    this.userType = dto['userType'];
    this.email = dto['email'];
    this.userGroups = dto['userGroups'];
    this.dispatcherDepartmentId = dto['dispatcherDepartmentId'];
    this.dispatcherDepartment = dto['dispatcherDepartment'];
  }
}
