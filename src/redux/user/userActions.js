import UserActionTypes from './userTypes';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signUpStart = (credentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: credentials,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
});

export const redirectToSign = (redirect) => ({
  type: UserActionTypes.REDIRECT_TO_SIGN_IN,
  payload: redirect,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signInStart = (credentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: credentials,
});

export const signInSuccess = (response) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: response,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const updateUserStart = (updatedInfo) => ({
  type: UserActionTypes.UPDATE_USER_START,
  payload: updatedInfo,
});

export const updateUserSuccess = (response) => ({
  type: UserActionTypes.UPDATE_USER_SUCCESS,
  payload: response,
});

export const updateUserFailure = (error) => ({
  type: UserActionTypes.UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUserFollowing = (id) => ({
  type: UserActionTypes.UPDATE_USER_FOLLOWING,
  payload: id,
});

export const updateUserUnfollowing = (id) => ({
  type: UserActionTypes.UPDATE_USER_FOLLOWING,
  payload: id,
});

export const likePostStart = (ids) => ({
  type: UserActionTypes.LIKE_POST_START,
  payload: ids,
});

export const likePostSuccess = (postId) => ({
  type: UserActionTypes.LIKE_POST_SUCCESS,
  payload: postId,
});

export const likePostFailure = (error) => ({
  type: UserActionTypes.LIKE_POST_FAILURE,
  payload: error,
});

export const unlikePostStart = (ids) => ({
  type: UserActionTypes.UNLIKE_POST_START,
  payload: ids,
});

export const unlikePostSuccess = (postId) => ({
  type: UserActionTypes.UNLIKE_POST_SUCCESS,
  payload: postId,
});

export const unlikePostFailure = (error) => ({
  type: UserActionTypes.UNLIKE_POST_FAILURE,
  payload: error,
});

export const commentLikeStart = (ids) => ({
  type: UserActionTypes.COMMENT_LIKE_START,
  payload: ids,
});

export const commentLikeSuccess = (commentId) => ({
  type: UserActionTypes.COMMENT_LIKE_SUCCESS,
  payload: commentId,
});

export const commentLikeFailure = (error) => ({
  type: UserActionTypes.COMMENT_LIKE_FAILURE,
  payload: error,
});

export const commentUnlikeStart = (ids) => ({
  type: UserActionTypes.COMMENT_UNLIKE_START,
  payload: ids,
});

export const commentUnlikeSuccess = (commentId) => ({
  type: UserActionTypes.COMMENT_UNLIKE_SUCCESS,
  payload: commentId,
});

export const commentUnlikeFailure = (error) => ({
  type: UserActionTypes.COMMENT_UNLIKE_FAILURE,
  payload: error,
});

export const replyLikeStart = (ids) => ({
  type: UserActionTypes.REPLY_LIKE_START,
  payload: ids,
});

export const replyLikeSuccess = (replyId) => ({
  type: UserActionTypes.REPLY_LIKE_SUCCESS,
  payload: replyId,
});

export const replyLikeFailure = (error) => ({
  type: UserActionTypes.REPLY_LIKE_FAILURE,
  payload: error,
});

export const replyUnlikeStart = (ids) => ({
  type: UserActionTypes.REPLY_UNLIKE_START,
  payload: ids,
});

export const replyUnlikeSuccess = (replyId) => ({
  type: UserActionTypes.REPLY_UNLIKE_SUCCESS,
  payload: replyId,
});

export const replyUnlikeFailure = (error) => ({
  type: UserActionTypes.REPLY_UNLIKE_FAILURE,
  payload: error,
});

export const forgotPasswordStart = (email) => ({
  type: UserActionTypes.FORGOT_PASSWORD_START,
  payload: email,
});

export const forgotPasswordSuccess = (message) => ({
  type: UserActionTypes.FORGOT_PASSWORD_SUCCESS,
  payload: message,
});

export const forgotPasswordFailure = (error) => ({
  type: UserActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const resetPasswordStart = (credentials) => ({
  type: UserActionTypes.RESET_PASSWORD_START,
  payload: credentials,
});

export const resetPasswordSuccess = (message) => ({
  type: UserActionTypes.RESET_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordFailure = (error) => ({
  type: UserActionTypes.RESET_PASSWORD_FAILURE,
  payload: error,
});
