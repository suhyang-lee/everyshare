import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import api from 'lib/api';

import POST from 'actions/postAction';

function loadPostAPI(data) {
  return api.get(`/post/${data.postId}`, data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data, action.lastId);
    yield put({
      type: POST.LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return api.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: POST.ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostAPI(data) {
  return api.patch(`/post/${parseInt(data.id, 10)}`, data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: POST.UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return api.delete(`/post/${data.postId}`, data);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: POST.REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return api.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: POST.UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadRemoveImagesAPI(data) {
  return api.delete(`/post/images?id=${data.id}`, data);
}

function* uploadRemoveImages(action) {
  try {
    const result = yield call(uploadRemoveImagesAPI, action.data);

    yield put({
      type: POST.REMOVE_IMAGES_SUCCESS,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.REMOVE_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(data, lastId) {
  return api.get(`/posts/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: POST.LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return api.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: POST.ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function updateCommentAPI(data) {
  return api.patch(`/post/comment/${data.commentId}`, data);
}

function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);
    console.log(result);
    yield put({
      type: POST.UPDATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.UPDATE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return api.delete(`/post/comment/${data.commentId}`);
}

function* removeComment(action) {
  try {
    yield call(removeCommentAPI, action.data);
    yield put({
      type: POST.REMOVE_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

//물건 찜하기
function zzimPostAPI(data) {
  return api.patch(`/post/${data.postId}/zzim`);
}

function* zzimPost(action) {
  try {
    const result = yield call(zzimPostAPI, action.data);
    yield put({
      type: POST.ZZIM_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.ZZIM_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//찜 삭제
function notZzimPostAPI(data) {
  return api.delete(`/post/${data.postId}/zzim`, data);
}

function* notZzimPost(action) {
  try {
    const result = yield call(notZzimPostAPI, action.data);
    yield put({
      type: POST.NOT_ZZIM_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.NOT_ZZIM_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addApplyAPI(data) {
  return api.post('post/apply', data);
}

function* addApply(action) {
  try {
    const result = yield call(addApplyAPI, action.data);

    yield put({
      type: POST.APPLY_RENTAL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST.APPLY_RENTAL_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(POST.LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(POST.ADD_POST_REQUEST, addPost);
}

function* watchUploadPost() {
  yield takeLatest(POST.UPDATE_POST_REQUEST, updatePost);
}

function* watchRemovePost() {
  yield takeLatest(POST.REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImages() {
  yield takeLatest(POST.UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchUploadRemoveImages() {
  yield takeLatest(POST.REMOVE_IMAGES_REQUEST, uploadRemoveImages);
}

function* watchZzimPost() {
  yield takeLatest(POST.ZZIM_POST_REQUEST, zzimPost);
}
function* watchNotZzimPost() {
  yield takeLatest(POST.NOT_ZZIM_POST_REQUEST, notZzimPost);
}

function* watchloadPost() {
  yield takeLatest(POST.LOAD_POST_REQUEST, loadPost);
}

function* watchAddComment() {
  yield takeLatest(POST.ADD_COMMENT_REQUEST, addComment);
}

function* watchUpdateComment() {
  yield takeLatest(POST.UPDATE_COMMENT_REQUEST, updateComment);
}

function* watchRemoveComment() {
  yield takeLatest(POST.REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchAddApply() {
  yield takeLatest(POST.APPLY_RENTAL_REQUEST, addApply);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchloadPost),
    fork(watchRemovePost),

    fork(watchAddPost),
    fork(watchUploadPost),
    fork(watchUploadImages),
    fork(watchUploadRemoveImages),

    fork(watchZzimPost),
    fork(watchNotZzimPost),

    fork(watchAddComment),
    fork(watchUpdateComment),
    fork(watchRemoveComment),

    fork(watchAddApply),
  ]);
}
