import { all, takeLatest } from "redux-saga/effects";

//sagas
import {
  signInSaga,
  getMeSaga,
  getApiKeySaga,
  createNewWalletSaga,
  getWalletSaga,
} from "./user.saga";
import { createCollectionSaga, getCollectionsSaga } from "./collection.saga";
import { createNFTSaga, getNFTsSaga } from "./nft.saga";

//slices
import {
  getMe,
  signIn,
  getApiKey,
  createNewWallet,
  getWallet,
} from "../slices/user.slice";
import { createCollection, getCollections } from "../slices/collection.slice";
import { createNFT, getNFTs } from "../slices/nft.slice";

function* rootSaga() {
  yield all([takeLatest(signIn.type, signInSaga)]);
  yield all([takeLatest(getMe.type, getMeSaga)]);
  yield all([takeLatest(getApiKey.type, getApiKeySaga)]);
  yield all([takeLatest(createCollection.type, createCollectionSaga)]);
  yield all([takeLatest(getCollections.type, getCollectionsSaga)]);
  yield all([takeLatest(createNFT.type, createNFTSaga)]);
  yield all([takeLatest(getNFTs.type, getNFTsSaga)]);
  yield all([takeLatest(createNewWallet.type, createNewWalletSaga)]);
  yield all([takeLatest(getWallet.type, getWalletSaga)]);
}

export default rootSaga;
