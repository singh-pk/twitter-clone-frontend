import PostActionTypes from './postTypes';

const INITIAL_STATE = {
  posts: {},
  error: null,
  isPostFetching: true,
  isPostByIdFetching: true,
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case PostActionTypes.GET_POST_BY_USER_SUCCESS:
    case PostActionTypes.GET_POST_BY_FOLLOWING_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isPostFetching: false,
        isPostByIdFetching: true,
      };
    case PostActionTypes.GET_POST_BY_ID_SUCCESS:
      return {
        posts: { [action.payload._id]: action.payload },
        isPostFetching: true,
        isPostByIdFetching: false,
      };
    case PostActionTypes.CREATE_POST_FAILURE:
    case PostActionTypes.GET_POST_BY_USER_FAILURE:
    case PostActionTypes.GET_POST_BY_ID_FAILURE:
    case PostActionTypes.GET_POST_BY_FOLLOWING_FAILURE:
      return {
        ...state,
        error: action.payload,
        isPostFetching: false,
      };
    default:
      return state;
  }
};

export default postReducer;
