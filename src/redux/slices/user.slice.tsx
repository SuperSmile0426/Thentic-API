import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  username?: string;
  apiKey?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as IUser,
    verifyingSignature: false,
    verifiedSignature: false,
    gettingMe: false,
    gotMe: false,
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
      localStorage.setItem("token", state.token)

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
      state.error = action.payload;
    },
    /*
    logout
    */
    logouts(state, action) {
      state.user = {};
      localStorage.removeItem("token");
      localStorage.removeItem("wallet_connection");
      action.payload.next();
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
  logouts,
} = userSlice.actions;

export default userSlice.reducer;
