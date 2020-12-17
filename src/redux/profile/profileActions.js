import ProfileActionTypes from './profileTypes';

export const fetchUserProfileStart = (userId) => ({
  type: ProfileActionTypes.FETCH_USER_PROFILE_START,
  payload: userId,
});

export const fetchUserProfileSuccess = (userProfile) => ({
  type: ProfileActionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: userProfile,
});

export const fetchUserProfileFailure = (error) => ({
  type: ProfileActionTypes.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

export const fetchWhoToFollowStart = (id) => ({
  type: ProfileActionTypes.FETCH_WHO_TO_FOLLOW_START,
  payload: id,
});

export const fetchWhoToFollowSuccess = (userArray) => ({
  type: ProfileActionTypes.FETCH_WHO_TO_FOLLOW_SUCCESS,
  payload: userArray,
});

export const fetchWhoToFollowFailure = (error) => ({
  type: ProfileActionTypes.FETCH_WHO_TO_FOLLOW_FAILURE,
  payload: error,
});

export const followUserStart = (ids) => ({
  type: ProfileActionTypes.FOLLOW_USER_START,
  payload: ids,
});

export const followUserSuccess = (response) => ({
  type: ProfileActionTypes.FOLLOW_USER_SUCCESS,
  payload: response,
});

export const followUserFailure = (error) => ({
  type: ProfileActionTypes.FOLLOW_USER_FAILURE,
  payload: error,
});

export const unFollowUserStart = (ids) => ({
  type: ProfileActionTypes.UNFOLLOW_USER_START,
  payload: ids,
});

export const unFollowUserSuccess = (response) => ({
  type: ProfileActionTypes.UNFOLLOW_USER_SUCCESS,
  payload: response,
});

export const unFollowUserFailure = (error) => ({
  type: ProfileActionTypes.UNFOLLOW_USER_FAILURE,
  payload: error,
});
