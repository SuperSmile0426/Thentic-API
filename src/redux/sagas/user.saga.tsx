import { call, put } from "redux-saga/effects";
import { userApi } from "../../api/user.api";

import {
  signInError,
  signInSuccess,
  getMeSuccess,
  getMeError,
  getApiKeySuccess,
  getApiKeyError,
} from "../slices/user.slice";

export function* getApiKeySaga(): any {
  try {
    const data = yield call(userApi.getApiKey);

    if (data) {
      yield put(getApiKeySuccess(data));
    }
  } catch (error) {
    yield put(getApiKeyError(error));
  }
}

export function* signInSaga(action: any): any {
  try {
    const data = yield call(userApi.signIn, action.payload.signInfo);

    if (data) {
      localStorage.setItem("token", data.AccessToken);
      action.payload.success();
      yield put(signInSuccess(data));
      action.payload.snext();
      action.payload.next();
    }
  } catch (error) {
    action.payload.failure();
    yield put(signInError(error));
    action.payload.next();
  }
}

export function* getMeSaga(action: any): any {
  try {
    const data = yield call(userApi.getMe, action.payload.token);
    // const data = {}
    if (data && data.user) {
      yield put(getMeSuccess(data.user));
    }
  } catch (error) {
    yield put(getMeError(error));
    action.payload.next();
  }
}
