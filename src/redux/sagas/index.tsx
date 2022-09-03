import { all, takeLatest } from "redux-saga/effects";

//sagas
import { signInSaga, getMeSaga, getApiKeySaga } from "./user.saga";

//slices
import { getMe, signIn, getApiKey } from "../slices/user.slice";

function* rootSaga() {
  yield all([takeLatest(signIn.type, signInSaga)]);
  yield all([takeLatest(getMe.type, getMeSaga)]);
  yield all([takeLatest(getApiKey.type, getApiKeySaga)]);
}

export default rootSaga;
