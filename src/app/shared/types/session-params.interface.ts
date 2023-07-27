import { Organization } from './organization.interface';
import { User } from './user.interface';

export interface SessionParams {
  readonly isAdmin?: boolean;
  readonly isTEDispatchSystemAvailable?: boolean;
  readonly organization?: Organization;
  readonly permissions?: string[];
  readonly systemStopped?: boolean;
  readonly user?: User;
}
