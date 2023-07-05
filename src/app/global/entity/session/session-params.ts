import { DTO } from '../DTO';
import { Organization } from '../organization/organization';
import { User } from '../user/user';

export class SessionParams implements DTO {
  constructor(
    public isAdmin?: boolean,
    public isTEDispatchSystemAvailable?: boolean,
    public organization?: Organization,
    public permissions?: string[],
    public systemStopped?: boolean,
    public user?: User
  ) {}

  public populateFromDTO(dto: any): void {
    this.isAdmin = dto['isAdmin'];
    this.isTEDispatchSystemAvailable = dto['isTEDispatchSystemAvailable'];
    this.organization = dto['organization'];
    this.permissions = dto['permissions'];
    this.systemStopped = dto['systemStopped'];
    this.user = dto['user'];
  }
}
