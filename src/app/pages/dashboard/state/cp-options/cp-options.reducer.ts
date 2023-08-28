import { CpOptionsState } from '@pages/dashboard/state/cp-options/cp-options-state.interface';
import { createReducer, on } from '@ngrx/store';
import { cpOptionsActions } from '@pages/dashboard/state/cp-options/cp-options.actions';

const initialState: CpOptionsState = {
  isLoading: false,
  isLoaded: false,
  data: null,
  error: null,
};

export const cpOptionsReducer = createReducer(
  initialState,
  on(
    cpOptionsActions.getCpOptions,
    (state: CpOptionsState): CpOptionsState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    cpOptionsActions.getCpOptionsSuccess,
    (state: CpOptionsState, action): CpOptionsState => ({
      ...state,
      isLoading: false,
      isLoaded: true,
      data: action.cpOptions,
      error: null,
    })
  ),
  on(
    cpOptionsActions.getCpOptionsFailure,
    (state: CpOptionsState, action): CpOptionsState => ({
      ...state,
      isLoading: false,
      isLoaded: false,
      data: null,
      error: action.error,
    })
  )
);
