import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import modalReducer from './modal/modalReducer';
import profileReducer from './profile/profileReducer';
import postReducer from './post/postReducer';
import commentReducer from './comments/commentReducer';

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  profile: profileReducer,
  post: postReducer,
  comment: commentReducer,
});
