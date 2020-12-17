import PostActionTypes from './postTypes';

export const createPostStart = (postData) => ({
  type: PostActionTypes.CREATE_POST_START,
  payload: postData,
});

export const createPostSuccess = (response) => ({
  type: PostActionTypes.CREATE_POST_SUCCESS,
  payload: response,
});

export const createPostFailure = (error) => ({
  type: PostActionTypes.CREATE_POST_FAILURE,
  payload: error,
});

export const getPostByUserStart = (id) => ({
  type: PostActionTypes.GET_POST_BY_USER_START,
  payload: id,
});

export const getPostByUserSuccess = (response) => ({
  type: PostActionTypes.GET_POST_BY_USER_SUCCESS,
  payload: response,
});

export const getPostByUserFailure = (error) => ({
  type: PostActionTypes.GET_POST_BY_USER_FAILURE,
  payload: error,
});

export const getPostByIdStart = (id) => ({
  type: PostActionTypes.GET_POST_BY_ID_START,
  payload: id,
});

export const getPostByIdSuccess = (response) => ({
  type: PostActionTypes.GET_POST_BY_ID_SUCCESS,
  payload: response,
});

export const getPostByIdFailure = (error) => ({
  type: PostActionTypes.GET_POST_BY_ID_FAILURE,
  payload: error,
});

export const getPostByFollowingStart = (id) => ({
  type: PostActionTypes.GET_POST_BY_FOLLOWING_START,
  payload: id,
});

export const getPostByFollowingSuccess = (response) => ({
  type: PostActionTypes.GET_POST_BY_FOLLOWING_SUCCESS,
  payload: response,
});

export const getPostByFollowingFailure = (error) => ({
  type: PostActionTypes.GET_POST_BY_FOLLOWING_FAILURE,
  payload: error,
});
