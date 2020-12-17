import { all, fork } from 'redux-saga/effects';

import { userSaga } from './user/userSagas';
import { profileSaga } from './profile/profileSagas';
import { postSaga } from './post/postSagas';
import { commentSaga } from './comments/commentSagas';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(profileSaga),
    fork(postSaga),
    fork(commentSaga),
  ]);
}
