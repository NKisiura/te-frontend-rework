import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sessionParamsFeatureKey } from './session-params-feature-key';
import { SessionParamsState } from './session-params-state.interface';

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
