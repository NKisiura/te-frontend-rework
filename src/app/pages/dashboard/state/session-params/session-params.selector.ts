import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sessionParamsFeatureKey } from './session-params-feature-key';
import { SessionParamsState } from './session-params-state.interface';
import { SessionParams } from '@global/types/session-params.interface';

const selectSessionParamsFeature = createFeatureSelector<SessionParamsState>(
  sessionParamsFeatureKey
);

export const selectSessionParamsLoading = createSelector(
  selectSessionParamsFeature,
  (state: SessionParamsState) => state.isLoading
);

export const selectSessionParamsData = createSelector(
  selectSessionParamsFeature,
  (state: SessionParamsState) => state.data
);

export const selectSessionParamsSet = createSelector(
  selectSessionParamsData,
  (sessionParams: SessionParams | null) =>
    sessionParams ? new Set(sessionParams.permissions) : null
);
