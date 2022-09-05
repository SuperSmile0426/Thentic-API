import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  NotFoundPage,
  DashboardPage,
  SignInPage,
  SignUpPage,
  CollectionsPage,
  NFTsPage,
  MyWalletPage,
} from "./pages";
import { NavBar } from "./components";

import { PATH } from "./consts";
//
const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={PATH.DASHBOARD} element={<DashboardPage />} />

        <Route path={PATH.NOTFOUND} element={<NotFoundPage />} />
        <Route path={PATH.SIGNIN} element={<SignInPage />} />
        <Route path={PATH.SIGNUP} element={<SignUpPage />} />
        <Route path={PATH.COLLECTION} element={<CollectionsPage />} />
        <Route path={PATH.COLLECTION_NFTS} element={<NFTsPage />} />
        <Route path={PATH.MYWALLET} element={<MyWalletPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
