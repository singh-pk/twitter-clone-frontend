import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  signUpSuccess,
  signUpFailure,
  redirectToSign,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  updateUserSuccess,
  updateUserFailure,
  likePostSuccess,
  likePostFailure,
  unlikePostSuccess,
  unlikePostFailure,
  commentLikeSuccess,
  commentLikeFailure,
  commentUnlikeSuccess,
  commentUnlikeFailure,
  replyLikeSuccess,
  replyLikeFailure,
  replyUnlikeSuccess,
  replyUnlikeFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure
} from './userActions';
import { toggleEditProfileModalHidden } from '../modal/modalActions';

import UserActionTypes from './userTypes';

const token = () => JSON.parse(localStorage.getItem('jwt')).token;

const persistAuthState = jwt => {
  if (typeof window !== undefined) {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }
};

const removePersistedAuthState = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem('jwt');
  }
};

function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(
      axios.post,
      '/signup',
      { name, email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    yield put(signUpSuccess());
    yield put(redirectToSign(true));
  } catch (err) {
    yield put(signUpFailure(err.response.data.error));
  }
}

function* signIn({ payload: { email, password } }) {
  try {
    const res = yield call(
      axios.post,
      '/signin',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    yield call(persistAuthState, res.data);
    yield put(signInSuccess(res.data.user));
  } catch (err) {
    console.log({ err });
    debugger;
    yield put(signInFailure(err.response.data.error));
  }
}

function* signOut() {
  try {
    yield call(axios.get, '/signout');
    yield call(removePersistedAuthState);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

function* updateUser({ payload: { userId, userData } }) {
  try {
    let res = yield call(axios.put, `/user/${userId}`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    });
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user = Object.assign(userInfo.user, res.data);
    yield call(persistAuthState, userInfo);
    yield put(updateUserSuccess(res.data));
    yield put(toggleEditProfileModalHidden());
    yield call(window.location.reload());
  } catch (err) {
    yield put(updateUserFailure(err));
  }
}

function* likePost({ payload: { postId, userId } }) {
  try {
    yield call(
      axios.put,
      `/post/like/${postId}`,
      { postId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = [...userInfo.user.likes, postId];
    yield call(persistAuthState, userInfo);
    yield put(likePostSuccess(postId));
  } catch (err) {
    yield put(likePostFailure(err.response));
  }
}

function* unlikePost({ payload: { postId, userId } }) {
  try {
    yield call(
      axios.put,
      `/post/unlike/${postId}`,
      { postId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = userInfo.user.likes.filter(id => id !== postId);
    yield call(persistAuthState, userInfo);
    yield put(unlikePostSuccess(postId));
  } catch (err) {
    yield put(unlikePostFailure(err.response));
  }
}

function* commentLike({ payload: { postId, commentId, userId } }) {
  try {
    yield call(
      axios.put,
      `/comment/like`,
      { postId, commentId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = [...userInfo.user.likes, commentId];
    yield call(persistAuthState, userInfo);
    yield put(commentLikeSuccess(commentId));
  } catch (err) {
    yield put(commentLikeFailure(err));
  }
}

function* commentUnlike({ payload: { postId, commentId, userId } }) {
  try {
    yield call(
      axios.put,
      `/comment/unlike`,
      { postId, commentId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = userInfo.user.likes.filter(id => id !== commentId);
    yield call(persistAuthState, userInfo);
    yield put(commentUnlikeSuccess(commentId));
  } catch (err) {
    yield put(commentUnlikeFailure(err.response));
  }
}

function* replyLike({ payload: { commentId, replyId, userId } }) {
  try {
    yield call(
      axios.put,
      `/reply/like`,
      { commentId, replyId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = [...userInfo.user.likes, replyId];
    yield call(persistAuthState, userInfo);
    yield put(replyLikeSuccess(replyId));
  } catch (err) {
    yield put(replyLikeFailure(err));
  }
}

function* replyUnlike({ payload: { commentId, replyId, userId } }) {
  try {
    yield call(
      axios.put,
      `/reply/unlike`,
      { commentId, replyId, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`
        }
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    userInfo.user.likes = userInfo.user.likes.filter(id => id !== replyId);
    yield call(persistAuthState, userInfo);
    yield put(replyUnlikeSuccess(replyId));
  } catch (err) {
    yield put(replyUnlikeFailure(err.response));
  }
}

function* forgotPassword({ payload: { email } }) {
  try {
    let res = yield call(
      axios.put,
      '/forgot-password',
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
    yield put(forgotPasswordSuccess(res.data.message));
  } catch (err) {
    yield put(forgotPasswordFailure(err.response.data.error));
  }
}

function* resetPassword({ payload: { resetPasswordToken, password } }) {
  try {
    let res = yield axios.put(
      '/reset-password',
      { resetPasswordToken, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    yield put(resetPasswordSuccess(res.data.message));
  } catch (err) {
    yield put(resetPasswordFailure(err.response.data.error));
  }
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onUpdateUserStart() {
  yield takeLatest(UserActionTypes.UPDATE_USER_START, updateUser);
}

function* onLikePostStart() {
  yield takeLatest(UserActionTypes.LIKE_POST_START, likePost);
}

function* onUnlikePostStart() {
  yield takeLatest(UserActionTypes.UNLIKE_POST_START, unlikePost);
}

function* onCommentLikeStart() {
  yield takeLatest(UserActionTypes.COMMENT_LIKE_START, commentLike);
}

function* onCommentUnlikeStart() {
  yield takeLatest(UserActionTypes.COMMENT_UNLIKE_START, commentUnlike);
}

function* onReplyLikeStart() {
  yield takeLatest(UserActionTypes.REPLY_LIKE_START, replyLike);
}

function* onReplyUnlikeStart() {
  yield takeLatest(UserActionTypes.REPLY_UNLIKE_START, replyUnlike);
}

function* onForgotPasswordStart() {
  yield takeLatest(UserActionTypes.FORGOT_PASSWORD_START, forgotPassword);
}

function* onResetPasswordStart() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* userSaga() {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignOutStart),
    call(onUpdateUserStart),
    call(onLikePostStart),
    call(onUnlikePostStart),
    call(onForgotPasswordStart),
    call(onResetPasswordStart),
    call(onCommentLikeStart),
    call(onCommentUnlikeStart),
    call(onReplyLikeStart),
    call(onReplyUnlikeStart)
  ]);
}
