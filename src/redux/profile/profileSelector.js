import { createSelector } from 'reselect';

const selectProfile = (state) => state.profile;

export const selectWhoToFollow = createSelector(
  [selectProfile],
  (profile) => profile.whoToFollow
);

export const selectUsersListIsFetching = createSelector(
  [selectProfile],
  (profile) => profile.isFetching
);

export const selectUserProfile = createSelector(
  [selectProfile],
  (profile) => profile.userProfile
);

export const selectIsFollowLoading = createSelector(
  [selectProfile],
  (profile) => profile.isFollowLoading
);

export const selectUserProfileFollower = createSelector(
  [selectUserProfile],
  (userProfile) => (userProfile ? userProfile.followers : null)
);

export const selectUserProfileId = createSelector(
  [selectUserProfile],
  (userProfile) => (userProfile ? userProfile._id : null)
);
