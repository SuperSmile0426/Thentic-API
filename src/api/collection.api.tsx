import { getClient } from "./client";

const thentic_Api = "https://thentic.tech";

const thenticClient = getClient(thentic_Api || "");

export const collectionApi = {
  async createCollection(data: any) {
    try {
      const res = await thenticClient.post("/api/nfts/contract", data);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getCollections(data: any) {
    try {
      // console.log("data:", data);
      const res = await thenticClient.get(
        `/api/contracts?key=${data.ApiKey}&chain_id=${data.chainId}`
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
