import {
  all, delay, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, SIGN_UP_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from '../reducer/user';

function logInAPI(data) {
  return axios.post('/login', data);
}

function logOutAPI() {
  return axios.post('/logout');
}

function signUpAPI() {
  return axios.post('/signup');
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data,
    });
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data,
    });
  }
}

function* signUp(action) {
  try {
    // const result = yield call(signUpAPI, action.data);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
