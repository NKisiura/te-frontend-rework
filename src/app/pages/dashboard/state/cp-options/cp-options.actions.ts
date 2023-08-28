import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CpOption } from '@shared/types/cp-option.interface';
import { BackendErrorResponse } from '@shared/types/backend-error-response.interface';

export const cpOptionsActions = createActionGroup({
  source: 'CP Options',
  events: {
    'Get CP Options': emptyProps(),
    'Get CP Options Success': props<{ cpOptions: CpOption[] }>(),
    'Get CP Options Failure': props<{ error: BackendErrorResponse }>(),
  },
});
