import UserActionTypes from './userTypes';

const INITIAL_STATE = {
  currentUser:
    (localStorage.getItem('jwt') &&
      JSON.parse(localStorage.getItem('jwt')).user) ||
    null,
  redirectToSignin: false,
  error: null,
  following:
    (localStorage.getItem('jwt') &&
      JSON.parse(localStorage.getItem('jwt')).user.following) ||
    [],
  likes:
    (localStorage.getItem('jwt') &&
      JSON.parse(localStorage.getItem('jwt')).user.likes) ||
    [],
  message: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case UserActionTypes.REDIRECT_TO_SIGN_IN:
      return {
        ...state,
        redirectToSignin: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        likes: action.payload.likes,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.LIKE_POST_SUCCESS:
    case UserActionTypes.COMMENT_LIKE_SUCCESS:
    case UserActionTypes.REPLY_LIKE_SUCCESS:
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    case UserActionTypes.UNLIKE_POST_SUCCESS:
    case UserActionTypes.COMMENT_UNLIKE_SUCCESS:
    case UserActionTypes.REPLY_UNLIKE_SUCCESS:
      return {
        ...state,
        likes: state.likes.filter((id) => id !== action.payload),
      };
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        message: action.payload,
      };
    case UserActionTypes.UPDATE_USER_FOLLOWING:
      return {
        ...state,
        following: [...state.following, action.payload],
      };
    case UserActionTypes.UPDATE_USER_UNFOLLOWING:
      return {
        ...state,
        following: state.following.filter((id) => id !== action.payload),
      };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.UPDATE_USER_FAILURE:
    case UserActionTypes.LIKE_POST_FAILURE:
    case UserActionTypes.UNLIKE_POST_FAILURE:
    case UserActionTypes.FORGOT_PASSWORD_FAILURE:
    case UserActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
