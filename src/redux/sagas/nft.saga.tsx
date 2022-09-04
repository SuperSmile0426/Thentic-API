import { call, put } from "redux-saga/effects";
import { NFTApi } from "../../api/nft.api";

import {
  createNFTSuccess,
  createNFTError,
  getNFTsSuccess,
  getNFTsError,
} from "../slices/nft.slice";

export function* createNFTSaga(action: any): any {
  try {
    const data = yield call(NFTApi.createNFT, action.payload.NFTInfo);

    if (data) {
      const transaction = yield call(NFTApi.newTransaction, data.request_id);

      if (transaction) {
        yield put(createNFTSuccess(data));
      }
    }
  } catch (error) {
    yield put(createNFTError(error));
  }
}

export function* getNFTsSaga(action: any): any {
  try {
    const data = yield call(NFTApi.getNFTs, action.payload.getNFTInfo);
    if (data) {
      for (let i = 1; i < data.nfts.length; i++) {
        data.nfts[i].data = JSON.parse(data.nfts[i].data);
      }
      yield put(getNFTsSuccess(data.nfts));
    }
  } catch (error) {
    yield put(getNFTsError(error));
  }
}
