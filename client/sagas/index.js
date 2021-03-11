import { all, fork } from "redux-saga/effects";
import axios from "axios";
import { ServerURL } from "config/config";

import userSaga from "sagas/user";
import postSaga from "sagas/post";
import searchSaga from "sagas/search";
import mypostSaga from "sagas/mypage";

axios.defaults.baseURL = ServerURL.getServerURL();
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(searchSaga),
    fork(mypostSaga),
  ]);
}
