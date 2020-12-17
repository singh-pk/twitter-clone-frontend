import { createSelector } from 'reselect';

const selectModal = (state) => state.modal;

export const selectModalHidden = createSelector(
  [selectModal],
  (modal) => modal.hidden
);

export const selectModalHiddenProfile = createSelector(
  [selectModal],
  (modal) => modal.hiddenProfile
);

export const selectModalHiddenEditProfile = createSelector(
  [selectModal],
  (modal) => modal.hiddenEditProfile
);

export const selectCommentToggleModal = createSelector(
  [selectModal],
  (modal) => modal.hiddenCreateComment
);
