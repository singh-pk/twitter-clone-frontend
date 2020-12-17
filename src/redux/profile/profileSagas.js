import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';

import {
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  fetchWhoToFollowSuccess,
  fetchWhoToFollowFailure,
  followUserSuccess,
  followUserFailure,
  unFollowUserSuccess,
  unFollowUserFailure,
} from './profileActions';

import {
  updateUserFollowing,
  updateUserUnfollowing,
} from '../user/userActions';

import ProfileActionTypes from './profileTypes';

const token = () => JSON.parse(localStorage.getItem('jwt')).token;

const persistAuthState = (jwt) => {
  if (typeof window !== undefined) {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }
};

function* fetchWhoToFollow({ payload: { userId } }) {
  try {
    let res = yield call(axios.get, `/user/whoToFollow/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    yield put(fetchWhoToFollowSuccess(res.data.users));
  } catch (err) {
    yield put(fetchWhoToFollowFailure(err));
  }
}

function* fetchUserProfile({ payload: { userId } }) {
  try {
    let res = yield call(axios.get, `/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
    });
    yield put(fetchUserProfileSuccess(res.data));
  } catch (err) {
    yield put(fetchUserProfileFailure(err.response.data.error));
  }
}

function* followUser({ payload: { userId, followId } }) {
  try {
    let res = yield call(
      axios.put,
      '/user/follow',
      { userId, followId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    yield userInfo.user.following.push(followId);
    yield call(persistAuthState, userInfo);
    yield put(updateUserFollowing(followId));
    yield put(followUserSuccess(res.data));
  } catch (err) {
    yield put(followUserFailure(err.response));
  }
}

function* unFollowUser({ payload: { userId, unfollowId } }) {
  try {
    let res = yield call(
      axios.put,
      '/user/unfollow',
      { userId, unfollowId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    let userInfo = yield JSON.parse(localStorage.getItem('jwt'));
    yield userInfo.user.following.filter((id) => id !== unfollowId);
    yield call(persistAuthState, userInfo);
    yield put(updateUserUnfollowing(unfollowId));
    yield put(unFollowUserSuccess(res.data));
  } catch (err) {
    yield put(unFollowUserFailure(err));
  }
}

function* onFetchWhoToFollowStart() {
  yield takeLatest(
    ProfileActionTypes.FETCH_WHO_TO_FOLLOW_START,
    fetchWhoToFollow
  );
}

function* onFetchUserProfileStart() {
  yield takeLatest(
    ProfileActionTypes.FETCH_USER_PROFILE_START,
    fetchUserProfile
  );
}

function* onFollowUserStart() {
  yield takeLatest(ProfileActionTypes.FOLLOW_USER_START, followUser);
}

function* onUnFollowUserStart() {
  yield takeLatest(ProfileActionTypes.UNFOLLOW_USER_START, unFollowUser);
}

export function* profileSaga() {
  yield all([
    call(onFetchWhoToFollowStart),
    call(onFetchUserProfileStart),
    call(onFollowUserStart),
    call(onUnFollowUserStart),
  ]);
}
