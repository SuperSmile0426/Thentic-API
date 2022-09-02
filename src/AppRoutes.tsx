import React from "react";
import { Routes, Route } from "react-router-dom";

import { NotFoundPage, DashboardPage, SignInPage, SignUpPage } from "./pages";
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

      </Routes>
    </>
  );
};

export default AppRoutes;
