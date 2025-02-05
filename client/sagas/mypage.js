import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authAPI from 'lib/api/auth';
import MYPAGE from 'actions/mypageAction';

function loadMyContentsAPI(data) {
  return authAPI.get(
    `mypage/contents?pageNum=${data.pageNum}&type=${data.type}`,
  );
}

function* loadMyContents(action) {
  try {
    const result = yield call(loadMyContentsAPI, action.data);
    yield put({
      type: MYPAGE.LOAD_MYCONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MYPAGE.LOAD_MYCONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyZzimListAPI() {
  return authAPI.get('mypage/zzim');
}

function* loadMyZzimList() {
  try {
    const result = yield call(loadMyZzimListAPI);
    yield put({
      type: MYPAGE.LOAD_MY_ZZIM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MYPAGE.LOAD_MY_ZZIM_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyOwnerListAPI() {
  return authAPI.get('mypage/owner');
}

function* loadMyOwnerList() {
  try {
    const result = yield call(loadMyOwnerListAPI);
    yield put({
      type: MYPAGE.LOAD_MY_OWNER_ITEM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MYPAGE.LOAD_MY_OWNER_ITEM_FAIL,
      error: err.response.data,
    });
  }
}

function loadMyRentalListAPI() {
  return authAPI.get('mypage/rental');
}

function* loadMyRentalList() {
  try {
    const result = yield call(loadMyRentalListAPI);
    yield put({
      type: MYPAGE.LOAD_MY_RENTAL_ITEM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MYPAGE.LOAD_MY_RENTAL_ITEM_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyContents() {
  yield takeLatest(MYPAGE.LOAD_MYCONTENTS_REQUEST, loadMyContents);
}

function* watchLoadMyZzimList() {
  yield takeLatest(MYPAGE.LOAD_MY_ZZIM_LIST_REQUEST, loadMyZzimList);
}

function* watchLoadMyOwnerList() {
  yield takeLatest(MYPAGE.LOAD_MY_OWNER_ITEM_REQUEST, loadMyOwnerList);
}

function* watchLoadMyRentalList() {
  yield takeLatest(MYPAGE.LOAD_MY_RENTAL_ITEM_REQUEST, loadMyRentalList);
}

export default function* mypageSaga() {
  yield all([
    fork(watchLoadMyContents),
    fork(watchLoadMyZzimList),
    fork(watchLoadMyOwnerList),
    fork(watchLoadMyRentalList),
  ]);
}
