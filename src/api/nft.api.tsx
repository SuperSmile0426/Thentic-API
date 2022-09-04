import { getClient } from "./client";

const thentic_Api = "https://thentic.tech";

const thenticClient = getClient(thentic_Api || "");

export const NFTApi = {
  async createNFT(data: any) {
    try {
      const res = await thenticClient.post("/api/nfts/mint", data);
      const resBody = res.data;
      console.log("NEWNFT", resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getNFTs(data: any) {
    try {
      const res = await thenticClient.get(
        `/api/nfts?key=${data.ApiKey}&chain_id=${data.chainId}`
      );
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async newTransaction(requestId: any) {
    try {
      // console.log("requestId", requestId);
      const res = await thenticClient.get(`request?id=${requestId}`);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
};
