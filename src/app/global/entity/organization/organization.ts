import { DTO } from '../DTO';

export class Organization implements DTO {
  constructor(
    public organizationId?: number,
    public organizationName?: string,
    public businessType?: string
  ) {}

  public populateFromDTO(dto: any) {
    this.organizationId = dto['organizationId'];
    this.organizationName = dto['organizationName'];
    this.businessType = dto['businessType'];
  }
}
