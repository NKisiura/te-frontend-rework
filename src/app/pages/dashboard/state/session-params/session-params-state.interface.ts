import { SessionParams } from '@shared/types/session-params.interface';
import { BackendErrorResponse } from '@shared/types/backend-error-response.interface';

export interface SessionParamsState {
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly data: SessionParams | null;
  readonly error: BackendErrorResponse | null;
}
