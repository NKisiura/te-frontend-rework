import { CpOption } from '@shared/types/cp-option.interface';
import { BackendErrorResponse } from '@shared/types/backend-error-response.interface';

export interface CpOptionsState {
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly data: CpOption[] | null;
  readonly error: BackendErrorResponse | null;
}
