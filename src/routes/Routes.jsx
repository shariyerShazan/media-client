import { createBrowserRouter } from "react-router";

import React from "react";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage /> ,
    children : [
      {
        index: true ,
        element: <HomePage />
      }
    ]
  },
      {
        path : "login",
        element: <Login />
      },
      {
        path : "register",
        element: <Register />
      }
]);
