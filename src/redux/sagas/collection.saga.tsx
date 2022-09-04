import { call, put } from "redux-saga/effects";
import { collectionApi } from "../../api/collection.api";

import {
  createCollectionSuccess,
  createCollectionError,
  getCollectionsSuccess,
  getCollectionsError,
} from "../slices/collection.slice";

export function* createCollectionSaga(action: any): any {
  try {
    const data = yield call(
      collectionApi.createCollection,
      action.payload.collectionInfo
    );

    if (data) {
      const transaction = yield call(
        collectionApi.newTransaction,
        data.request_id
      );

      if (transaction) {
        yield put(createCollectionSuccess(data));
      }
    }
  } catch (error) {
    yield put(createCollectionError(error));
  }
}

export function* getCollectionsSaga(action: any): any {
  try {
    const data = yield call(
      collectionApi.getCollections,
      action.payload.getCollectionInfo
    );
    if (data) {
      yield put(getCollectionsSuccess(data));
    }
  } catch (error) {
    yield put(getCollectionsError(error));
  }
}
