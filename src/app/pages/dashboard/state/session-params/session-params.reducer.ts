import { SessionParamsState } from './session-params-state.interface';
import { createReducer, on } from '@ngrx/store';
import { sessionParamsActions } from './session-params.actions';

const initialState: SessionParamsState = {
  isLoading: false,
  isLoaded: false,
  data: null,
  error: null,
};

export const sessionParamsReducer = createReducer(
  initialState,
  on(
    sessionParamsActions.getSessionParams,
    (state: SessionParamsState): SessionParamsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    sessionParamsActions.getSessionParamsSuccess,
    (state: SessionParamsState, action): SessionParamsState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      data: action.sessionParams,
      error: null,
    })
  ),
  on(
    sessionParamsActions.getSessionParamsFailure,
    (state: SessionParamsState, action): SessionParamsState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      data: null,
      error: action.error,
    })
  )
);
