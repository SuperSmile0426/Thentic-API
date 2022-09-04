import { createSlice } from "@reduxjs/toolkit";

export interface ICollection {
  contract?: string;
  name?: string;
  short_name?: string;
  status?: string;
  chain_id?: string;
  request_id?: string;
  transaction_url?: string;
  transaction_pixel?: string;
}

const userSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [] as ICollection[],
    collection: {} as ICollection,
    creatingCollection: false,
    createdCollection: false,
    gettingCollections: false,
    gotCollections: false,
  },
  reducers: {
    /**
     * create New collection
     */
    createCollection(state, action) {
      state.creatingCollection = true;
      state.createdCollection = false;
    },
    createCollectionSuccess(state, action) {
      state.creatingCollection = false;
      state.createdCollection = true;
      state.collection = action.payload;
      // console.log("collection:", state.collection);
    },
    createCollectionError(state, action) {
      state.creatingCollection = false;
      state.createdCollection = false;
    },
    /**
     * get Collctions
     */
    getCollections(state, action) {
      state.gettingCollections = true;
      state.gotCollections = false;
    },
    getCollectionsSuccess(state, action) {
      state.gettingCollections = false;
      state.gotCollections = true;
      state.collections = action.payload.contracts;
      // console.log("collections:", state.collections);
    },
    getCollectionsError(state, action) {
      state.gettingCollections = false;
      state.gotCollections = false;
    },

    /**
     * get Collctions
     */
    newTransaction(state, action) {},
    newTransactionSuccess(state, action) {},
    newTransactionError(state, action) {},
  },
});

export const {
  createCollection,
  createCollectionSuccess,
  createCollectionError,
  getCollections,
  getCollectionsSuccess,
  getCollectionsError,
  newTransaction,
  newTransactionSuccess,
  newTransactionError,
} = userSlice.actions;

export default userSlice.reducer;
