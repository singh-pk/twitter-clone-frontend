import { takeLatest, takeEvery, all, call, put } from 'redux-saga/effects';
import axios from '../../config/axios';

import {
  getCommentsByPostIdSuccess,
  getCommentsByPostIdFailure,
  getRepliesByCommentIdSuccess,
  getRepliesByCommentIdFailure
  // createCommentSuccess,
  // createReplySuccess,
} from './commentActions';

import CommentActionTypes from './commentTypes';

const token = () => JSON.parse(localStorage.getItem('jwt')).token;

const transformData = responseData =>
  responseData.reduce((accumulator, response) => {
    accumulator[response._id] = response;
    return accumulator;
  }, {});

function* getCommentsByPostId({ payload: { postId, userId } }) {
  try {
    let res = yield axios.get(`/post/${postId}/${userId}/comment`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    });
    let transformedData = transformData(res.data.comments);
    yield put(getCommentsByPostIdSuccess(transformedData));
  } catch (err) {
    yield put(getCommentsByPostIdFailure(err));
  }
}

function* getRepliesByCommentId({ payload: { commentId, userId } }) {
  try {
    let res = yield axios.get(`/comment/${commentId}/${userId}/reply`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    });
    yield console.log(res);
    let transformedData = transformData(res.data.replies);
    yield put(getRepliesByCommentIdSuccess({ [commentId]: transformedData }));
  } catch (err) {
    yield put(getRepliesByCommentIdFailure(err));
  }
}

function* createComment({ payload: { postId, userId } }) {
  try {
    let res = yield call(axios.post, `/post/${postId}/${userId}/comment`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    });
    yield console.log(res);
  } catch (err) {
    yield console.table(err);
  }
}

function* createReply({ payload: { commentId, userId } }) {
  try {
    let res = yield call(axios.post, `/comment/${commentId}/${userId}/reply`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`
      }
    });
    yield console.log(res);
  } catch (err) {
    yield console.table(err);
  }
}

function* onGetCommetsByPostIdStart() {
  yield takeLatest(
    CommentActionTypes.GET_COMMENTS_BY_POST_ID_START,
    getCommentsByPostId
  );
}

function* onGetRepliesByCommentIdStart() {
  yield takeEvery(
    CommentActionTypes.GET_REPLIES_BY_COMMENT_ID_START,
    getRepliesByCommentId
  );
}

function* onCreateCommentStart() {
  yield takeLatest(CommentActionTypes.CREATE_COMMENT_START, createComment);
}

function* onCreateReplyStart() {
  yield takeLatest(CommentActionTypes.CREATE_REPLY_START, createReply);
}

export function* commentSaga() {
  yield all([
    call(onGetCommetsByPostIdStart),
    call(onGetRepliesByCommentIdStart),
    call(onCreateCommentStart),
    call(onCreateReplyStart)
  ]);
}
