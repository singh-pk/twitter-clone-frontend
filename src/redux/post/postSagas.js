import { takeLatest, all, call, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  getPostByUserSuccess,
  getPostByUserFailure,
  getPostByIdSuccess,
  getPostByIdFailure,
  getPostByFollowingSuccess,
  getPostByFollowingFailure,
} from './postActions';

import PostActionTypes from './postTypes';

const token = () => JSON.parse(localStorage.getItem('jwt')).token;

const transformData = (responseData) =>
  responseData.reduce((accumulator, response) => {
    accumulator[response._id] = response;
    return accumulator;
  }, {});

function* createPost({ payload: { userId, postData } }) {
  try {
    let res = yield axios.post(`/post/new/${userId}`, postData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    yield console.log(res);
  } catch (err) {
    yield console.log(err.response);
  }
}

function* getPostsByUser({ payload: { userProfileId } }) {
  try {
    let res = yield call(axios.get, `/post/by/${userProfileId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    let transformedData = yield call(transformData, res.data);
    yield put(getPostByUserSuccess(transformedData));
  } catch (err) {
    yield put(getPostByUserFailure(err.response));
  }
}

function* getPostById({ payload: { postId } }) {
  try {
    let res = yield call(axios.get, `/post/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    yield console.log(res);
    yield put(getPostByIdSuccess(res.data));
  } catch (err) {
    yield put(getPostByIdFailure(err.response));
  }
}

function* getPostByFollowing({ payload: { userId } }) {
  try {
    let res = yield call(axios.get, `/post/by/following/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    let transformedData = yield call(transformData, res.data);
    yield console.log('Transformed data ', transformedData);
    yield put(getPostByFollowingSuccess(transformedData));
  } catch (err) {
    yield put(getPostByFollowingFailure(err.response));
  }
}

function* onCreatePostStart() {
  yield takeLatest(PostActionTypes.CREATE_POST_START, createPost);
}

function* onGetPostByUserStart() {
  yield takeLatest(PostActionTypes.GET_POST_BY_USER_START, getPostsByUser);
}

function* onGetPostByIdStart() {
  yield takeLatest(PostActionTypes.GET_POST_BY_ID_START, getPostById);
}

function* onGetPostByFollowingStart() {
  yield takeLatest(
    PostActionTypes.GET_POST_BY_FOLLOWING_START,
    getPostByFollowing
  );
}

export function* postSaga() {
  yield all([
    call(onCreatePostStart),
    call(onGetPostByUserStart),
    call(onGetPostByIdStart),
    call(onGetPostByFollowingStart),
  ]);
}
