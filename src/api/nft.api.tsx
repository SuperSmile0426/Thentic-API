import { getClient } from "./client";

const thentic_Api = "https://thentic.tech";

const thenticClient = getClient(thentic_Api || "");

export const NFTApi = {
  async createNFT(data: any) {
    try {
      const res = await thenticClient.post("/api/nfts/mint", data);
      const resBody = res.data;
      // console.log("NEWNFT", resBody);
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

  async buyNFT(data: any, price: Number) {
    try {
      const res = await thenticClient.post("/api/nfts/transfer", data);
      const resBody = res.data;
      // console.log("NEWNFT", resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async createInvoiceNFT(data: any, price: Number) {
    try {
      const param = {
        key: data.key,
        chain_id: data.chain_id,
        amount: price,
        to: data.from,
      };
      const res = await thenticClient.post("/api/invoices/new", param);
      const resBody = res.data;
      console.log("NewInvoice", resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },
};
