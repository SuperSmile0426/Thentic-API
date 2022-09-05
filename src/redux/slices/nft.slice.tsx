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
  owner_address?: string;
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
    buyingNFT: false,
    boughtNFT: false,
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
     * get nfts
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
     * get nfts
     */
    buyNFT(state, action) {
      state.buyingNFT = true;
      state.boughtNFT = false;
    },
    buyNFTSuccess(state, action) {
      state.buyingNFT = false;
      state.boughtNFT = true;
      state.NFTs = action.payload;
    },
    buyNFTError(state, action) {
      state.buyingNFT = false;
      state.boughtNFT = false;
    },

    /**
     * nft transaction
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
  buyNFT,
  buyNFTSuccess,
  buyNFTError,
  newTransaction,
  newTransactionSuccess,
  newTransactionError,
} = userSlice.actions;

export default userSlice.reducer;
