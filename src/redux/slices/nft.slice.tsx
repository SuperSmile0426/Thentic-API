import { createSlice } from "@reduxjs/toolkit";

export interface INFT {
  name?: string;
  short_name?: string;
  chain_id?: string;
  contract?: string;
  id?: string;
  data?: any;
  status?: string;
  request_id?: string;
  transaction_url?: string;
  transaction_pixel?: string;
}

const userSlice = createSlice({
  name: "nft",
  initialState: {
    NFTs: [] as INFT[],
    NFT: {} as INFT,
    creatingNFT: false,
    createdNFT: false,
    gettingNFTs: false,
    gotNFTs: false,
  },
  reducers: {
    /**
     * create New NFT
     */
    createNFT(state, action) {
      state.creatingNFT = true;
      state.createdNFT = false;
    },
    createNFTSuccess(state, action) {
      state.creatingNFT = false;
      state.createdNFT = true;
      state.NFT = action.payload;
    },
    createNFTError(state, action) {
      state.creatingNFT = false;
      state.createdNFT = false;
    },
    /**
     * get Collctions
     */
    getNFTs(state, action) {
      state.gettingNFTs = true;
      state.gotNFTs = false;
    },
    getNFTsSuccess(state, action) {
      state.gettingNFTs = false;
      state.gotNFTs = true;
      state.NFTs = action.payload;
    },
    getNFTsError(state, action) {
      state.gettingNFTs = false;
      state.gotNFTs = false;
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
  createNFT,
  createNFTSuccess,
  createNFTError,
  getNFTs,
  getNFTsSuccess,
  getNFTsError,
  newTransaction,
  newTransactionSuccess,
  newTransactionError,
} = userSlice.actions;

export default userSlice.reducer;
