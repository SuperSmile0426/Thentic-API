import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  email?: string;
  apiKey?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as IUser,
    api_Key: "",
    mail: "",
    pwd: "",
    verifyingSignature: false,
    verifiedSignature: false,
    gettingMe: false,
    gotMe: false,
    gettingApiKey: false,
    gotApiKey: false,
    token: "",
    error: {},
  },
  reducers: {
    /**
     * signIn
     */
    signIn(state, action) {
      state.verifyingSignature = true;
      state.verifiedSignature = false;
    },
    signInSuccess(state, action) {
      state.verifyingSignature = false;
      state.verifiedSignature = true;
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);

      console.log("token:", state.token);
    },
    signInError(state, action) {
      state.verifyingSignature = false;
      state.verifiedSignature = false;
      state.error = action.payload;
    },
    /**
     * getMe
     */
    getMe(state, action) {
      state.gettingMe = true;
      state.gotMe = false;
    },
    getMeSuccess(state, action) {
      state.gettingMe = false;
      state.gotMe = true;
      state.user = { ...action.payload };
    },
    getMeError(state, action) {
      state.gettingMe = false;
      state.gotMe = false;
      state.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("ApiKey");
      state.error = action.payload;
    },
    /*
    getApiKey
    */
    getApiKey(state, action) {
      state.gettingApiKey = true;
    },
    getApiKeySuccess(state, action) {
      state.gettingApiKey = true;
      state.gotApiKey = false;
      state.api_Key = action.payload;
    },
    getApiKeyError(state, action) {
      state.gettingApiKey = false;
      state.gotApiKey = false;
      state.error = action.payload;
    },
    /*
    logout
    */
    logouts(state, action) {
      state.user = {};
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("ApiKey");
      localStorage.removeItem("wallet_connection");
    },

    setUserSuccess(state, action) {
      state.mail = action.payload.email;
      state.pwd = action.payload.password;
    },
    setLoginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("ApiKey", state.api_Key);
    },
  },
});

export const {
  signIn,
  signInSuccess,
  signInError,
  getMe,
  getMeSuccess,
  getMeError,
  getApiKey,
  getApiKeySuccess,
  getApiKeyError,
  setUserSuccess,
  setLoginSuccess,
  logouts,
} = userSlice.actions;

export default userSlice.reducer;
