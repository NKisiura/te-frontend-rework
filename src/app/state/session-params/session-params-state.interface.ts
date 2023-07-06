import { SessionParams } from '../../global/entity/session/session-params';
import { BackendErrorResponse } from '../../global/types/backend-error-response.interface';

export interface SessionParamsState {
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly data: SessionParams | null;
  readonly error: BackendErrorResponse | null;
}
