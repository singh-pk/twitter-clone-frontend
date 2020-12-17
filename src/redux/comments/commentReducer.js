import CommentActionTypes from './commentTypes';

const INITIAL_STATE = {
  comments: null,
  replies: {},
  isCommentsFetching: true,
  isRepliesFetching: true,
  error: null,
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.GET_COMMENTS_BY_POST_ID_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isCommentsFetching: false,
        error: null,
      };
    case CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_SUCCESS:
      return {
        ...state,
        replies: { ...state.replies, ...action.payload },
        isRepliesFetching: false,
        error: null,
      };
    case CommentActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: { ...state.comments, ...action.payload },
      };
    case CommentActionTypes.CREATE_REPLY_SUCCESS:
      return {
        ...state,
        replies: { ...state.replies, ...action.payload },
      };
    case CommentActionTypes.GET_COMMENTS_BY_POST_ID_FAILURE:
    case CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_FAILURE:
    case CommentActionTypes.CREATE_COMMENT_FAILURE:
    case CommentActionTypes.CREATE_REPLY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCommentsFetching: false,
        isRepliesFetching: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
