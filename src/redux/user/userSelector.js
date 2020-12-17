import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserFollowing = createSelector(
  [selectUser],
  (user) => user.following
);

export const selectMessage = createSelector(
  [selectUser],
  (user) => user.message
);

export const selectUserLikes = createSelector(
  [selectUser],
  (user) => user.likes
);

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser._id
);

export const selectCurrentUserName = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.name
);

export const selectCurrentUserPhoto = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.photoUrl
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.error
);

export const selectRedirectToSignIn = createSelector(
  [selectUser],
  (user) => user.redirectToSignin
);
