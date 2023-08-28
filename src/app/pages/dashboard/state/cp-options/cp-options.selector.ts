import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cpOptionsFeatureKey } from '@pages/dashboard/state/cp-options/cp-options-feature-key';
import { CpOptionsState } from '@pages/dashboard/state/cp-options/cp-options-state.interface';

const selectCpOptionsFeature =
  createFeatureSelector<CpOptionsState>(cpOptionsFeatureKey);

export const selectCpOptionsLoading = createSelector(
  selectCpOptionsFeature,
  (state: CpOptionsState) => state.isLoading
);

export const selectCpOptionsLoaded = createSelector(
  selectCpOptionsFeature,
  (state: CpOptionsState) => state.isLoaded
);

export const selectCpOptionsList = createSelector(
  selectCpOptionsFeature,
  (state: CpOptionsState) => state.data
);
