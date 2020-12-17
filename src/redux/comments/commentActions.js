import CommentActionTypes from './commentTypes';

export const getCommentsByPostIdStart = (ids) => ({
  type: CommentActionTypes.GET_COMMENTS_BY_POST_ID_START,
  payload: ids,
});

export const getCommentsByPostIdSuccess = (response) => ({
  type: CommentActionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS,
  payload: response,
});

export const getCommentsByPostIdFailure = (error) => ({
  type: CommentActionTypes.GET_COMMENTS_BY_POST_ID_FAILURE,
  payload: error,
});

export const getRepliesByCommentIdStart = (ids) => ({
  type: CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_START,
  payload: ids,
});

export const getRepliesByCommentIdSuccess = (response) => ({
  type: CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_SUCCESS,
  payload: response,
});

export const getRepliesByCommentIdFailure = (error) => ({
  type: CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_FAILURE,
  payload: error,
});

export const createCommentStart = (comment) => ({
  type: CommentActionTypes.CREATE_COMMENTS_START,
  payload: comment,
});

export const createCommentSuccess = (response) => ({
  type: CommentActionTypes.CREATE_COMMENTS_SUCCESS,
  payload: response,
});

export const createCommentFailure = (error) => ({
  type: CommentActionTypes.CREATE_COMMENTS_FAILURE,
  payload: error,
});

export const createReplyStart = (reply) => ({
  type: CommentActionTypes.CREATE_REPLY_START,
  payload: reply,
});

export const createReplySuccess = (response) => ({
  type: CommentActionTypes.CREATE_REPLY_SUCCESS,
  payload: response,
});

export const createReplyFailure = (error) => ({
  type: CommentActionTypes.CREATE_REPLY_FAILURE,
  payload: error,
});
