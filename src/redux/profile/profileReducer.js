import ProfileActionTypes from './profileTypes';

const INITIAL_STATE = {
  userProfile: null,
  whoToFollow: null,
  isFetching: true,
  isFollowLoading: true,
  error: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.FETCH_USER_PROFILE_START:
      return {
        ...state,
        userProfile: null,
      };
    case ProfileActionTypes.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        error: null,
      };
    case ProfileActionTypes.FETCH_WHO_TO_FOLLOW_SUCCESS:
      return {
        ...state,
        whoToFollow: action.payload,
        isFetching: false,
        error: null,
      };
    case ProfileActionTypes.FOLLOW_USER_SUCCESS:
    case ProfileActionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isFollowLoading: false,
        error: null,
      };
    case ProfileActionTypes.FETCH_USER_PROFILE_FAILURE:
    case ProfileActionTypes.FETCH_WHO_TO_FOLLOW_FAILURE:
      return {
        ...state,
        whoToFollow: null,
        isFetching: false,
        error: action.payload,
      };
    case ProfileActionTypes.FOLLOW_USER_FAILURE:
    case ProfileActionTypes.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        isFollowLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
