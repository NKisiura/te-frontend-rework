import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SessionParams } from '@global/types/session-params.interface';
import { BackendErrorResponse } from '@global/types/backend-error-response.interface';

export const sessionParamsActions = createActionGroup({
  source: 'Session Params',
  events: {
    'Get Session Params': emptyProps(),
    'Get Session Params Success': props<{ sessionParams: SessionParams }>(),
    'Get Session Params Failure': props<{ error: BackendErrorResponse }>(),
  },
});
