import { getClient } from "./client";

const Server_Api = "http://localhost:5000/api/vi";
const thentic_Api = "https://thentic.tech";

const mainClient = getClient(Server_Api || "");
const thenticClient = getClient(thentic_Api || "");

export const userApi = {
  async getWallets() {
    try {
      const apiKey = localStorage.getItem("ApiKey");
      const res = await thenticClient.get(`/api/wallets/all?key=${apiKey}`);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
  async createNewWallet() {
    try {
      const apiKey = localStorage.getItem("ApiKey");
      const res = await thenticClient.post("/api/wallets/new", { key: apiKey });
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
  async getApiKey() {
    try {
      const res = await thenticClient.get("/api/key");
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
  async signIn(data: JSON) {
    try {
      const res = await mainClient.post("/auth/signin", data);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
  async getMe(token: string) {
    try {
      const res = await mainClient.get("/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
};
